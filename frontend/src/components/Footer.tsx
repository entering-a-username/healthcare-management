export default function Footer() {
  return (
    <footer>
      <div>
        <div>
          <span className="logo">HealthCare</span>
        </div>

        <div className="lists">
          <ul>
            <span>Company</span>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/login">Login</a></li>
          </ul>

          <ul>
            <span>Get in Touch</span>
            <li><a href="tel:+123456789">+123 456 789</a></li>
            <li><a href="mailto:company@gmail.com">company@gmail.com</a></li>
            <li>Address: 10101 Agmashenebeli, Tbilisi, Georgia</li>
          </ul>
        </div>
      </div>

      <span>&copy; COPYRIGHT</span>

    </footer>
  )
}
