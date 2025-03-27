import React from "react";

const MainPage = () => {
	return (
		<div style={{ fontFamily: "Arial, sans-serif", textAlign: "center", backgroundColor: "#f5f9ff", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
			<div style={{ position: "relative", width: "100%", maxWidth: "1200px", height: "600px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
				{/* Left Background Circle */}
				<div style={{ position: "absolute", left: "-100px", top: "50px", width: "600px", height: "600px", backgroundColor: "#d3e7fd", borderRadius: "50%" }}></div>

				{/* Login Box */}
				<div
					style={{
						position: "relative",
						zIndex: 2,
						width: "400px",
						padding: "30px",
						backgroundColor: "#e0e0e0",
						borderRadius: "10px",
						boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
					}}>
					<h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>PMJAY</h1>
					<div style={{ marginBottom: "15px", textAlign: "left" }}>
						<label htmlFor='username' style={{ display: "block", marginBottom: "5px" }}>
							Username
						</label>
						<input
							id='username'
							type='email'
							placeholder='Enter your email address'
							style={{ width: "100%", padding: "10px", fontSize: "14px", borderRadius: "5px", border: "1px solid #ccc" }}
						/>
					</div>
					<div style={{ marginBottom: "20px", textAlign: "left" }}>
						<label htmlFor='password' style={{ display: "block", marginBottom: "5px" }}>
							Password
						</label>
						<input
							id='password'
							type='password'
							placeholder='Enter your password'
							style={{ width: "100%", padding: "10px", fontSize: "14px", borderRadius: "5px", border: "1px solid #ccc" }}
						/>
					</div>
					<button
						style={{
							width: "100%",
							padding: "10px",
							fontSize: "14px",
							backgroundColor: "#007bff",
							color: "#fff",
							border: "none",
							borderRadius: "5px",
							cursor: "pointer",
							marginBottom: "10px",
						}}>
						Sign Up
					</button>
					<div style={{ textAlign: "center", marginBottom: "10px", color: "#777" }}>or</div>
					<button
						style={{
							width: "100%",
							padding: "10px",
							fontSize: "14px",
							backgroundColor: "#0056b3",
							color: "#fff",
							border: "none",
							borderRadius: "5px",
							cursor: "pointer",
						}}>
						Sign-up now
					</button>
				</div>

				{/* Illustration */}
				<div style={{ position: "relative", zIndex: 1, width: "400px", textAlign: "center" }}>
					<img src='https://via.placeholder.com/400' alt='Doctor with Patient Illustration' style={{ width: "100%", height: "auto" }} />
				</div>
			</div>
		</div>
	);
};

export default MainPage;
