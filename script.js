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
  // Get the calculation inputs and result
  const cohesion = document.getElementById("cohesion").value;
  const area = document.getElementById("area").value;
  const weight = document.getElementById("weight").value;
  const frictionAngle = document.getElementById("frictionAngle").value;
  const slopeAngle = document.getElementById("slopeAngle").value;
  const result = document.getElementById("result").innerText;

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
  doc.text(result, 10, 90);

  // Save the PDF
  doc.save("sliding_wedge_report.pdf");
}
