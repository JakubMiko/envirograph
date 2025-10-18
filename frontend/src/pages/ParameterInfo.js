import React from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import { BsThermometerHalf, BsCloudDrizzle, BsWater, BsDroplet, BsLightning } from "react-icons/bs";

const parameters = [
	{
		name: "Temperature (°C)",
		desc: "Fish and other organisms have a preferred temperature range. The index decreases from 1 for every degree above 20°C.",
		max: "Best at 20°C",
		color: "text-primary",
		icon: <BsThermometerHalf size={32} className="mb-2 text-primary" />,
		link: "Best at 20°C",
		linkColor: "primary",
	},
	{
		name: "Biological Oxygen Demand (mg/L)",
		desc: "Indicates organic pollution. IBOD reaches a high of 30 for BOD = 0 mg/L. For BOD > 12 mg/L, IBOD = 0.",
		max: "Best at 0 mg/L",
		color: "text-success",
		icon: <BsCloudDrizzle size={32} className="mb-2 text-success" />,
		link: "Best at 0 mg/L",
		linkColor: "success",
	},
	{
		name: "Total Suspended Solids (mg/L)",
		desc: "Particles suspended in water. ITSS reaches a high of 25 for TSS = 0 mg/L. For TSS > 250 mg/L, ITSS = 0.",
		max: "Best at 0 mg/L",
		color: "text-warning",
		icon: <BsWater size={32} className="mb-2 text-warning" />,
		link: "Best at 0 mg/L",
		linkColor: "warning",
	},
	{
		name: "Dissolved Oxygen (mg/L)",
		desc: "Oxygen available for aquatic life. IDO reaches a high of 25 when DO > 10 mg/L. For DO = 0 mg/L, IDO = 0. Sufficient oxygen supports healthy ecosystems.",
		max: "Best at >10 mg/L",
		color: "text-info",
		icon: <BsDroplet size={32} className="mb-2 text-info" />,
		link: "Best at >10 mg/L",
		linkColor: "info",
	},
	{
		name: "Conductivity (μS/cm)",
		desc: "Ability of water to conduct electricity, related to dissolved salts. ICOND reaches a high of 20 at 200 μS/cm. For conductivity > 4000 μS/cm, ICOND = 0.",
		max: "Best at 200 μS/cm",
		color: "text-secondary",
		icon: <BsLightning size={32} className="mb-2 text-secondary" />,
		link: "Best at 200 μS/cm",
		linkColor: "secondary",
	},
];

function ParameterInfo() {
	return (
		<div
			className="d-flex flex-column align-items-center justify-content-center w-100"
			style={{
				minHeight: "70vh",
				background: "linear-gradient(180deg, #f8fafc 0%, #e0f7fa 100%)",
				padding: "64px 0 140px 0"
			}}
		>
			<Container id="parameters" className="mt-0 d-flex flex-column justify-content-center">
				<h2 className="text-primary fw-bold mb-4 text-center">
					Water Quality Parameters
				</h2>
				<Row className="g-4 justify-content-center align-items-stretch mb-4 mx-auto" style={{ maxWidth: 1400 }}>
					{parameters.slice(0, 3).map((param) => (
						<Col xs={12} sm={6} lg={4} className="h-100 d-flex" key={param.name}>
							<Card className="h-100 shadow-lg border-0 rounded-4 parameter-card-bg p-4 w-100">
								<Card.Body className="d-flex flex-column align-items-center justify-content-center text-center">
									{param.icon}
									<Card.Title className={`mb-2 fw-bold fs-6 ${param.color}`}>
										{param.name}
									</Card.Title>
									<Card.Text className="mb-2 small text-muted">
										{param.desc}
									</Card.Text>
									<Card.Text className="mb-0">
										<span className="fw-bold">Optimal Value:</span>{" "}
										<span className={`fw-semibold text-${param.linkColor}`}>
											{param.link}
										</span>
									</Card.Text>
								</Card.Body>
							</Card>
						</Col>
					))}
				</Row>
				<Row className="g-4 justify-content-center align-items-stretch mx-auto" style={{ maxWidth: 930 }}>
					{parameters.slice(3).map((param) => (
						<Col xs={12} sm={6} lg={6} className="h-100 d-flex" key={param.name}>
							<Card className="h-100 shadow-lg border-0 rounded-4 parameter-card-bg p-4 w-100">
								<Card.Body className="d-flex flex-column align-items-center justify-content-center text-center">
									{param.icon}
									<Card.Title className={`mb-2 fw-bold fs-6 ${param.color}`}>
										{param.name}
									</Card.Title>
									<Card.Text className="mb-2 small text-muted">
										{param.desc}
									</Card.Text>
									<Card.Text className="mb-0">
										<span className="fw-bold">Optimal Value:</span>{" "}
										<span className={`fw-semibold text-${param.linkColor}`}>
											{param.link}
										</span>
									</Card.Text>
								</Card.Body>
							</Card>
						</Col>
					))}
				</Row>
			</Container>
		</div>
	);
}

export default ParameterInfo;