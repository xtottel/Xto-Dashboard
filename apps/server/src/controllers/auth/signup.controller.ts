// controllers/auth/signup.controller.ts
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { sendMail } from "@/utils/mailer";
import { VerificationEmail } from "@/emails/VerificationEmail";
import crypto from 'crypto';
import { validatePasswordStrength } from '@/utils/security';

// const prisma = new PrismaClient();
// Configure Prisma with increased timeout
const prisma = new PrismaClient({
  transactionOptions: {
    maxWait: 30000,
    timeout: 30000,
  },
});

export const signup = async (req: Request, res: Response) => {
  try {
    const {
      businessName,
      firstName,
      lastName,
      email,
      phone,
      password
    } = req.body;

    // Validate required fields
    if (!businessName || !firstName || !lastName || !email || !phone || !password) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Validate password strength
    const passwordValidation = validatePasswordStrength(password);
    if (!passwordValidation.valid) {
      return res.status(400).json({
        success: false,
        message: passwordValidation.message
      });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'User already exists with this email'
      });
    }

    // Check if business name is taken
    const existingBusiness = await prisma.business.findUnique({
      where: { name: businessName }
    });

    if (existingBusiness) {
      return res.status(409).json({
        success: false,
        message: 'Business name is already taken'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create business and user in transaction
    let result;
    try {
      result = await prisma.$transaction(async (tx) => {
        // Create business
        const business = await tx.business.create({
          data: {
            name: businessName,
            phone,
            isActive: true
          }
        });

        // Create default business settings
        await tx.businessSettings.create({
          data: {
            businessId: business.id,
            securityLevel: 'STANDARD',
            mfaRequired: false,
            sessionTimeout: 1440,
            maxLoginAttempts: 5
          }
        });

        // Get or create default admin role
        let defaultRole = await tx.role.findFirst({
          where: { name: 'Admin' }
        });

        if (!defaultRole) {
          // Create the Admin role if it doesn't exist
          defaultRole = await tx.role.create({
            data: {
              name: 'Admin',
              description: 'Administrator with full access rights',
              permissions: ['*'] // Grant all permissions
            }
          });
        }

        // Create user
        const user = await tx.user.create({
          data: {
            firstName,
            lastName,
            email,
            phone,
            password: hashedPassword,
            businessId: business.id,
            roleId: defaultRole.id,
            isActive: true
          },
          include: {
            business: true,
            role: true
          }
        });

        // Create MFA settings for user
        await tx.mFASettings.create({
          data: {
            userId: user.id,
            method: 'NONE',
            isEnabled: false,
            backupCodes: []
          }
        });

        // Generate email verification token
        const verificationToken = crypto.randomBytes(32).toString('hex');
        const verificationExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

        await tx.verificationToken.create({
          data: {
            token: verificationToken,
            expiresAt: verificationExpiry,
            userId: user.id
          }
        });

        return { user, verificationToken };
      });
    } catch (transactionError) {
      console.error('Transaction error:', transactionError);
      throw new Error('Failed to create user and business');
    }

    // Send verification email
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${result.verificationToken}`;
    const name = `${firstName} ${lastName}`;
    
    await sendMail({
      to: email,
      subject: 'Verify your email',
      react: VerificationEmail({ name, url: verificationUrl }),
    });

    // Return user data without password
    const { password: _, ...userWithoutPassword } = result.user;

    res.status(201).json({
      success: true,
      message: 'User created successfully. Please check your email to verify your account.',
      user: userWithoutPassword
    });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create user'
    });
  }
};