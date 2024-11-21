function calculateFS() {
  // Get user inputs
  const c = parseFloat(document.getElementById("cohesion").value);
  const A = parseFloat(document.getElementById("area").value);
  const W = parseFloat(document.getElementById("weight").value);
  const phi = parseFloat(document.getElementById("frictionAngle").value);
  const theta = parseFloat(document.getElementById("slopeAngle").value);

  // Convert angles to radians
  const phiRadians = (phi * Math.PI) / 180;
  const thetaRadians = (theta * Math.PI) / 180;

  // Sliding wedge formula
  const resistingForce = c * A + W * Math.cos(thetaRadians) * Math.tan(phiRadians);
  const drivingForce = W * Math.sin(thetaRadians);

  const FS = resistingForce / drivingForce;

  // Display the result
  document.getElementById("result").innerText = `Result: FS = ${FS.toFixed(2)}`;
}
function generatePDF() {
  // Get user inputs
  const cohesion = parseFloat(document.getElementById("cohesion").value);
  const area = parseFloat(document.getElementById("area").value);
  const weight = parseFloat(document.getElementById("weight").value);
  const frictionAngle = parseFloat(document.getElementById("frictionAngle").value);
  const slopeAngle = parseFloat(document.getElementById("slopeAngle").value);
  const result = document.getElementById("result").innerText;

  // Convert angles to radians
  const phiRadians = (frictionAngle * Math.PI) / 180;
  const thetaRadians = (slopeAngle * Math.PI) / 180;

  // Calculate intermediate values
  const resistingForce = cohesion * area + weight * Math.cos(thetaRadians) * Math.tan(phiRadians);
  const drivingForce = weight * Math.sin(thetaRadians);
  const FS = resistingForce / drivingForce;

  // Create the calculation steps
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

  // Create a new PDF document
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Add content to the PDF
  doc.setFontSize(16);
  doc.text("Sliding Wedge Calculator Report", 10, 10);
  doc.setFontSize(12);
  doc.text(`Cohesion (c): ${cohesion} kPa`, 10, 30);
  doc.text(`Area (A): ${area} m²`, 10, 40);
  doc.text(`Weight (W): ${weight} kN`, 10, 50);
  doc.text(`Friction Angle (φ): ${frictionAngle}°`, 10, 60);
  doc.text(`Slope Angle (θ): ${slopeAngle}°`, 10, 70);
  doc.text(result, 10, 80);

  // Add calculation steps
  let y = 90;
  steps.forEach((step, index) => {
    doc.text(step, 10, y);
    y += 10; // Move to the next line
    if (y > 270) { // Handle page overflow
      doc.addPage();
      y = 10;
    }
  });

  // Save the PDF
  doc.save("sliding_wedge_report.pdf");
}
