export default function Contact() {
  return (
    <main className="contact">
      <h1>CONTACT US</h1>

      <div>
        <img src="/src/assets/img/contact_image.png" alt="" />
        
        <div>
          <h2>OUR OFFICE</h2>
          <span>10101 Agmashenebeli <br /> Suite 50, Tbilisi, Georgia</span> <br />
        
          <span>Tel: +123 456 789 <br /> Email: company@gmail.com</span>

          <h2 className='job'>CAREERS AT COMPANY</h2>
          <p>Looking for a job as a part of our support team? <br /> mail us your cv! </p>
          <a href="mailto:company@gmail.com">Send Email</a>
        </div>
      </div>
    </main>
  )
}