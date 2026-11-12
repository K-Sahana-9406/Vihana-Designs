import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateEnquiryReference } from '@/lib/utils';
import { sendEmail, getEnquiryConfirmationEmailHtml } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      brandName,
      serviceType,
      industry,
      projectDescription,
      requiredFeatures,
      budgetRange,
      timeline,
      referenceLinks,
    } = body;

    // Validation
    if (!name || !email || !serviceType || !projectDescription) {
      return NextResponse.json(
        { error: 'Name, email, service type, and project description are required.' },
        { status: 400 }
      );
    }

    const referenceId = generateEnquiryReference();

    const enquiry = await prisma.enquiry.create({
      data: {
        referenceId,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone ? phone.trim() : null,
        brandName: brandName ? brandName.trim() : null,
        serviceType,
        industry: industry ? industry.trim() : null,
        projectDescription: projectDescription.trim(),
        requiredFeatures: JSON.stringify(requiredFeatures || []),
        budgetRange: budgetRange || 'Flexible',
        timeline: timeline || 'Standard',
        referenceLinks: referenceLinks ? referenceLinks.trim() : null,
        status: 'NEW',
      },
    });

    // Send client email acknowledgement
    const emailHtml = getEnquiryConfirmationEmailHtml({
      clientName: name,
      referenceId,
      serviceType,
    });

    await sendEmail({
      to: email,
      subject: `Project Enquiry Received [${referenceId}] — VIHANA DESIGNS`,
      html: emailHtml,
    });

    // Notify admin
    const contactEmail = process.env.CONTACT_EMAIL || 'hello@vihanadesigns.com';
    await sendEmail({
      to: contactEmail,
      subject: `[NEW LEAD] ${name} (${referenceId}) - ${serviceType}`,
      html: `
        <h3>New Project Enquiry: ${referenceId}</h3>
        <p><strong>Client:</strong> ${name} (${email}, ${phone || 'No phone'})</p>
        <p><strong>Brand:</strong> ${brandName || 'N/A'} | <strong>Industry:</strong> ${industry || 'N/A'}</p>
        <p><strong>Service:</strong> ${serviceType} | <strong>Budget:</strong> ${budgetRange}</p>
        <p><strong>Timeline:</strong> ${timeline}</p>
        <p><strong>Description:</strong><br/>${projectDescription}</p>
        <p><strong>References:</strong> ${referenceLinks || 'None'}</p>
      `,
    });

    return NextResponse.json({
      success: true,
      referenceId,
      message: 'Enquiry recorded successfully.',
    });
  } catch (err: any) {
    console.error('[ENQUIRY ERROR]', err);
    return NextResponse.json({ error: err.message || 'Error processing enquiry' }, { status: 500 });
  }
}

