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
