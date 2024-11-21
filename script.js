// Function to calculate the Factor of Safety
function calculateFS() {
  // Get input values
  const cohesion = parseFloat(document.getElementById("cohesion").value);
  const area = parseFloat(document.getElementById("area").value);
  const weight = parseFloat(document.getElementById("weight").value);
  const frictionAngle = parseFloat(document.getElementById("frictionAngle").value);
  const slopeAngle = parseFloat(document.getElementById("slopeAngle").value);

  // Check if inputs are valid
  if (isNaN(cohesion) || isNaN(area) || isNaN(weight) || isNaN(frictionAngle) || isNaN(slopeAngle)) {
    alert("Please enter valid numbers for all fields.");
    return;
  }

  // Convert angles to radians
  const phiRadians = (frictionAngle * Math.PI) / 180;
  const thetaRadians = (slopeAngle * Math.PI) / 180;

  // Calculate intermediate values
  const resistingForce = cohesion * area + weight * Math.cos(thetaRadians) * Math.tan(phiRadians);
  const drivingForce = weight * Math.sin(thetaRadians);
  const FS = resistingForce / drivingForce;

  // Display the result
  document.getElementById("result").innerText = `Factor of Safety (FS): ${FS.toFixed(2)}`;
}

// Function to generate a PDF with calculations
function generatePDF() {
  // Get input values
  const cohesion = parseFloat(document.getElementById("cohesion").value);
  const area = parseFloat(document.getElementById("area").value);
  const weight = parseFloat(document.getElementById("weight").value);
  const frictionAngle = parseFloat(document.getElementById("frictionAngle").value);
  const slopeAngle = parseFloat(document.getElementById("slopeAngle").value);

  // Convert angles to radians
  const phiRadians = (frictionAngle * Math.PI) / 180;
  const thetaRadians = (slopeAngle * Math.PI) / 180;

  // Calculate intermediate values
  const resistingForce = cohesion * area + weight * Math.cos(thetaRadians) * Math.tan(phiRadians);
  const drivingForce = weight * Math.sin(thetaRadians);
  const FS = resistingForce / drivingForce;

  // Prepare calculation steps
  const steps = [
    `1. Convert angles to radians:`,
    `   - Friction Angle (φ): ${frictionAngle}° = ${phiRadians.toFixed(3)} radians`,
    `   - Slope Angle (θ): ${slopeAngle}° = ${thetaRadians.toFixed(3)} radians`,
    `2. Calculate resisting force:`,
    `   - Resisting Force = c × A + W × cos(θ) × tan(φ)`,
    `   - Resisting Force = ${cohesion} × ${area} + ${weight} × cos(${thetaRadians.toFixed(3)}) × tan(${phiRadians.toFixed(3)})`,
    `   - Resisting Force = ${resistingForce.toFixed(2)} kN`,
    `3. Calculate driving force:`,
    `   - Driving Force = W × sin(θ)`,
    `   - Driving Force = ${weight} × sin(${thetaRadians.toFixed(3)})`,
    `   - Driving Force = ${drivingForce.toFixed(2)} kN`,
    `4. Calculate Factor of Safety (FS):`,
    `   - FS = Resisting Force / Driving Force`,
    `   - FS = ${resistingForce.toFixed(2)} / ${drivingForce.toFixed(2)}`,
    `   - FS = ${FS.toFixed(2)}`
  ];

  // Create the PDF
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Add header
  doc.setFontSize(16);
  doc.text("Sliding Wedge Calculator Report", 10, 10);

  // Add inputs
  doc.setFontSize(12);
  doc.text("Input Values:", 10, 30);
  doc.text(`- Cohesion (c): ${cohesion} kPa`, 10, 40);
  doc.text(`- Area (A): ${area} m²`, 10, 50);
  doc.text(`- Weight (W): ${weight} kN`, 10, 60);
  doc.text(`- Friction Angle (φ): ${frictionAngle}°`, 10, 70);
  doc.text(`- Slope Angle (θ): ${slopeAngle}°`, 10, 80);

  // Add calculation steps
  doc.text("Calculation Steps:", 10, 100);
  let y = 110;
  steps.forEach((step) => {
    doc.text(step, 10, y);
    y += 10;
    if (y > 270) { // Handle page overflow
      doc.addPage();
      y = 10;
    }
  });

  // Add result
  doc.text(`Final Result: Factor of Safety (FS) = ${FS.toFixed(2)}`, 10, y + 10);

  // Save the PDF
  doc.save("sliding_wedge_report.pdf");
}
