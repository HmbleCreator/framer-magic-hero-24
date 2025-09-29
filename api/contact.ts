import { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';
import { z } from 'zod';

// Form validation schemas
const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(1000, "Message must be less than 1000 characters"),
  formType: z.literal('contact')
});

const newsletterSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  formType: z.literal('newsletter')
});

const bookingSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().trim().min(10, "Phone number must be at least 10 characters").max(20, "Phone number must be less than 20 characters"),
  date: z.string().trim().min(1, "Date is required"),
  time: z.string().trim().min(1, "Time is required"),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(1000, "Message must be less than 1000 characters"),
  formType: z.literal('booking')
});

// Email templates
const getEmailTemplate = (formType: string, data: any) => {
  const baseStyles = `
    <style>
      body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f5f5f5; }
      .container { max-width: 600px; margin: 0 auto; background-color: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
      .header { background: linear-gradient(135deg, #814ac6, #df7afe); padding: 30px; text-align: center; color: white; }
      .header h1 { margin: 0; font-size: 28px; font-weight: bold; }
      .content { padding: 30px; }
      .field { margin-bottom: 20px; }
      .label { font-weight: bold; color: #814ac6; display: block; margin-bottom: 5px; }
      .value { background-color: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #814ac6; }
      .footer { background-color: #1a1a1a; color: white; padding: 20px; text-align: center; }
      .footer a { color: #814ac6; text-decoration: none; }
    </style>
  `;

  switch (formType) {
    case 'contact':
      return `
        ${baseStyles}
        <div class="container">
          <div class="header">
            <h1>🚀 New Contact Inquiry</h1>
            <p>OrbitLabs Lead Capture System</p>
          </div>
          <div class="content">
            <div class="field">
              <span class="label">👤 Name:</span>
              <div class="value">${data.name}</div>
            </div>
            <div class="field">
              <span class="label">📧 Email:</span>
              <div class="value">${data.email}</div>
            </div>
            <div class="field">
              <span class="label">💬 Message:</span>
              <div class="value">${data.message.replace(/\n/g, '<br>')}</div>
            </div>
          </div>
          <div class="footer">
            <p>💡 <strong>Next Steps:</strong> Respond within 2 hours for optimal conversion</p>
            <p>Powered by <a href="https://orbitlabs.dev">OrbitLabs</a> Lead System</p>
          </div>
        </div>
      `;

    case 'newsletter':
      return `
        ${baseStyles}
        <div class="container">
          <div class="header">
            <h1>📧 New Newsletter Subscriber</h1>
            <p>OrbitLabs Lead Capture System</p>
          </div>
          <div class="content">
            <div class="field">
              <span class="label">👤 Name:</span>
              <div class="value">${data.name}</div>
            </div>
            <div class="field">
              <span class="label">📧 Email:</span>
              <div class="value">${data.email}</div>
            </div>
          </div>
          <div class="footer">
            <p>💡 <strong>Action Required:</strong> Add to email marketing platform</p>
            <p>Powered by <a href="https://orbitlabs.dev">OrbitLabs</a> Lead System</p>
          </div>
        </div>
      `;

    case 'booking':
      return `
        ${baseStyles}
        <div class="container">
          <div class="header">
            <h1>📅 New Consultation Request</h1>
            <p>OrbitLabs Lead Capture System</p>
          </div>
          <div class="content">
            <div class="field">
              <span class="label">👤 Name:</span>
              <div class="value">${data.name}</div>
            </div>
            <div class="field">
              <span class="label">📧 Email:</span>
              <div class="value">${data.email}</div>
            </div>
            <div class="field">
              <span class="label">📱 Phone:</span>
              <div class="value">${data.phone}</div>
            </div>
            <div class="field">
              <span class="label">📅 Preferred Date:</span>
              <div class="value">${new Date(data.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
            </div>
            <div class="field">
              <span class="label">🕐 Preferred Time:</span>
              <div class="value">${data.time}</div>
            </div>
            <div class="field">
              <span class="label">💬 Message:</span>
              <div class="value">${data.message.replace(/\n/g, '<br>')}</div>
            </div>
          </div>
          <div class="footer">
            <p>⚡ <strong>Priority:</strong> High-value consultation lead - respond ASAP</p>
            <p>Powered by <a href="https://orbitlabs.dev">OrbitLabs</a> Lead System</p>
          </div>
        </div>
      `;

    default:
      return '';
  }
};

// Auto-reply templates
const getAutoReplyTemplate = (formType: string, data: any) => {
  const baseStyles = `
    <style>
      body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f5f5f5; }
      .container { max-width: 600px; margin: 0 auto; background-color: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
      .header { background: linear-gradient(135deg, #814ac6, #df7afe); padding: 30px; text-align: center; color: white; }
      .header h1 { margin: 0; font-size: 28px; font-weight: bold; }
      .content { padding: 30px; }
      .footer { background-color: #1a1a1a; color: white; padding: 20px; text-align: center; }
      .footer a { color: #814ac6; text-decoration: none; }
      .cta-button { display: inline-block; background: linear-gradient(135deg, #814ac6, #df7afe); color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0; }
    </style>
  `;

  switch (formType) {
    case 'contact':
      return `
        ${baseStyles}
        <div class="container">
          <div class="header">
            <h1>✅ Message Received!</h1>
            <p>Thank you for contacting OrbitLabs</p>
          </div>
          <div class="content">
            <p>Hi ${data.name},</p>
            <p>Thank you for reaching out to OrbitLabs! We've received your inquiry and our team will review it shortly.</p>
            <p><strong>What happens next:</strong></p>
            <ul>
              <li>📧 Our team will respond within 24 hours</li>
              <li>🎯 We'll discuss your automation needs in detail</li>
              <li>💡 Receive a custom solution proposal</li>
              <li>🚀 Start your transformation journey</li>
            </ul>
            <p>In the meantime, feel free to explore our case studies and learn how we've helped other businesses automate their workflows.</p>
            <a href="https://orbitlabs.dev/#case-studies" class="cta-button">View Case Studies</a>
          </div>
          <div class="footer">
            <p>Best regards,<br>The OrbitLabs Team</p>
            <p>🌐 <a href="https://orbitlabs.dev">orbitlabs.dev</a> | 📧 <a href="mailto:hello.orbitlabs@gmail.com">hello.orbitlabs@gmail.com</a></p>
          </div>
        </div>
      `;

    case 'newsletter':
      return `
        ${baseStyles}
        <div class="container">
          <div class="header">
            <h1>🎉 Welcome to OrbitLabs!</h1>
            <p>Thanks for subscribing to our newsletter</p>
          </div>
          <div class="content">
            <p>Hi ${data.name},</p>
            <p>Welcome to the OrbitLabs community! You're now part of an exclusive group that receives:</p>
            <ul>
              <li>🤖 Latest AI automation insights</li>
              <li>📊 Industry trends and analysis</li>
              <li>🎯 Actionable workflow optimization tips</li>
              <li>🚀 Exclusive offers and early access</li>
            </ul>
            <p>Your first newsletter will arrive soon, packed with valuable automation strategies that can transform your business.</p>
            <a href="https://orbitlabs.dev" class="cta-button">Explore Our Services</a>
          </div>
          <div class="footer">
            <p>Welcome aboard!<br>The OrbitLabs Team</p>
            <p>🌐 <a href="https://orbitlabs.dev">orbitlabs.dev</a> | 📧 <a href="mailto:hello.orbitlabs@gmail.com">hello.orbitlabs@gmail.com</a></p>
          </div>
        </div>
      `;

    case 'booking':
      return `
        ${baseStyles}
        <div class="container">
          <div class="header">
            <h1>📅 Consultation Request Received!</h1>
            <p>We'll contact you soon to confirm your call</p>
          </div>
          <div class="content">
            <p>Hi ${data.name},</p>
            <p>Thank you for booking a consultation with OrbitLabs! We're excited to discuss how we can help automate and optimize your business processes.</p>
            <p><strong>Your requested details:</strong></p>
            <ul>
              <li>📅 Date: ${new Date(data.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</li>
              <li>🕐 Time: ${data.time}</li>
              <li>📱 Phone: ${data.phone}</li>
            </ul>
            <p><strong>What to expect:</strong></p>
            <ul>
              <li>📞 We'll call you within 24 hours to confirm the appointment</li>
              <li>📋 A brief consultation about your current workflows</li>
              <li>💡 Initial automation recommendations</li>
              <li>🎯 Custom solution roadmap discussion</li>
            </ul>
            <a href="https://orbitlabs.dev/#services" class="cta-button">Learn About Our Services</a>
          </div>
          <div class="footer">
            <p>Looking forward to speaking with you!<br>The OrbitLabs Team</p>
            <p>🌐 <a href="https://orbitlabs.dev">orbitlabs.dev</a> | 📧 <a href="mailto:hello.orbitlabs@gmail.com">hello.orbitlabs@gmail.com</a></p>
          </div>
        </div>
      `;

    default:
      return '';
  }
};

// Rate limiting (simple in-memory store for demo)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX_REQUESTS = 100;

const checkRateLimit = (ip: string): boolean => {
  const now = Date.now();
  const userRequests = rateLimitMap.get(ip) || [];
  
  // Remove old requests outside the window
  const validRequests = userRequests.filter((time: number) => now - time < RATE_LIMIT_WINDOW);
  
  if (validRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }
  
  validRequests.push(now);
  rateLimitMap.set(ip, validRequests);
  return true;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  // Rate limiting
  const clientIp = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unknown';
  const ip = Array.isArray(clientIp) ? clientIp[0] : clientIp;
  
  if (!checkRateLimit(ip.toString())) {
    return res.status(429).json({ success: false, message: 'Too many requests. Please try again later.' });
  }

  try {
    const { formType } = req.body;

    // Validate based on form type
    let validatedData;
    switch (formType) {
      case 'contact':
        validatedData = contactSchema.parse(req.body);
        break;
      case 'newsletter':
        validatedData = newsletterSchema.parse(req.body);
        break;
      case 'booking':
        validatedData = bookingSchema.parse(req.body);
        break;
      default:
        return res.status(400).json({ success: false, message: 'Invalid form type' });
    }

    // Create transporter
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Email subject based on form type
    const subjects = {
      contact: '🚀 New Contact Inquiry - OrbitLabs',
      newsletter: '📧 New Newsletter Subscriber - OrbitLabs',
      booking: '📅 New Consultation Request - OrbitLabs'
    };

    // Send notification email to OrbitLabs
    const notificationEmail = {
      from: process.env.GMAIL_USER,
      to: 'hello.orbitlabs@gmail.com',
      subject: subjects[formType as keyof typeof subjects],
      html: getEmailTemplate(formType, validatedData),
    };

    // Send auto-reply to user  
    const autoReplyEmail = {
      from: process.env.GMAIL_USER,
      to: validatedData.email,
      subject: `Thank you for contacting OrbitLabs! ${formType === 'booking' ? '- Consultation Request Received' : formType === 'newsletter' ? '- Welcome to our newsletter!' : '- We\'ll be in touch soon'}`,
      html: getAutoReplyTemplate(formType, validatedData),
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(notificationEmail),
      transporter.sendMail(autoReplyEmail)
    ]);

    return res.status(200).json({ 
      success: true, 
      message: 'Thank you! Your message has been received and we\'ll get back to you soon.' 
    });

  } catch (error) {
    console.error('Contact form error:', error);
    
    // Check if environment variables are missing
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.error('Missing email configuration environment variables');
      return res.status(500).json({ 
        success: false, 
        message: 'Email service configuration error. Please contact support.' 
      });
    }
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please check your form data', 
        errors: error.errors.map(e => e.message)
      });
    }

    return res.status(500).json({ 
      success: false, 
      message: 'Something went wrong. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}