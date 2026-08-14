export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <p>&copy; {new Date().getFullYear()} Mpho Mokwena. All rights reserved.</p>

        <p className="credit-line">
          Designed &amp; Developed by{' '}
          <a
            href="https://femtechinstitute.tech"
            target="_blank"
            rel="noopener noreferrer"
          >
            FemTech Institute
          </a>
        </p>
      </div>
    </footer>
  );
}
