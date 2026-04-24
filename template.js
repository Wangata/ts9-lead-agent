function generateEstimateEmail(data, estimate) {
  return `
Hi ${data.first_name || "there"},

Thanks for reaching out about your ${data.project_type || ""} project in ${data.location || ""}.

Based on your project size of ${data.project_size} sq ft, our pricing starts around $${estimate} per discipline.

We handle full Architectural, Structural, MEP, and Fire Protection plans, and our turnaround is typically 3–7 days.

We use the most current codes in your city/county, and we stay with you until your plans are approved — no hidden fees, you pay once.

To finalize your quote, feel free to send over your floor plans, sketches, or project scope.

You can also call or text us directly at (215) 436-7333.

Best,  
Nadif  
Founder | Designer @ TS9Designs  
https://ts9designs.com
`;
}

module.exports = { generateEstimateEmail };
