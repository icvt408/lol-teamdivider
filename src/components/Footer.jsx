import "./Footer.css";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer>
            <p>&copy; {currentYear} My Website. All Rights Reserved.</p>
        </footer>
    )
}

export default Footer;