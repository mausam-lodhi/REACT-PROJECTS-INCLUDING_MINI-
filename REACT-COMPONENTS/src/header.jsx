import React from "react";

const styles = {
	Header: {
		top: "0px",
		left: "0px",
		width: "1424px",
		height: "64px",
		backgroundColor: "ffffff",
		boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
	},
	Icon: {
		color: "#407294",
		fill: "#407294",
		fontSize: "21px",
		width: "21px",
		height: "32px",
		marginRight: "16px",
	},
	Title: {
		color: "#030303",
		fontSize: "24px",
		fontFamily: "Poppins",
		fontWeight: 700,
		lineHeight: "32px",
		flexGrow: 1,
	},
	Link: {
		color: "#030303",
		fontSize: "16px",
		fontFamily: "Poppins",
		lineHeight: "24px",
		marginLeft: "16px",
		cursor: "pointer",
	},
};

const IconComponent = () => (
	<svg style={styles.Icon} viewBox='0 0 448 512'>
		<path d='M448 492v20H0v-20c0-6.627 5.373-12 12-12h20V120c0-13.255 10.745-24 24-24h88V24c0-13.255 10.745-24 24-24h112c13.255 0 24 10.745 24 24v72h88c13.255 0 24 10.745 24 24v360h20c6.627 0 12 5.373 12 12zM308 192h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12zm-168 64h40c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12zm104 128h-40c-6.627 0-12 5.373-12 12v84h64v-84c0-6.627-5.373-12-12-12zm64-96h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12zm-116 12c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12v-40zM182 96h26v26a6 6 0 0 0 6 6h20a6 6 0 0 0 6-6V96h26a6 6 0 0 0 6-6V70a6 6 0 0 0-6-6h-26V38a6 6 0 0 0-6-6h-20a6 6 0 0 0-6 6v26h-26a6 6 0 0 0-6 6v20a6 6 0 0 0 6 6z'></path>
	</svg>
);

const Header = () => {
	return (
		<div style={styles.Header}>
			<IconComponent />
			<div style={styles.Title}>PMJAY Hospital Search</div>
			<div style={styles.Link}>Home</div>
			<div style={styles.Link}>Search</div>
		</div>
	);
};

export default Header;
