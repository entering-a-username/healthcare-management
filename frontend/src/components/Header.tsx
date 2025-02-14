import header from "../assets/img/header_img.png"

import { RiArrowRightLine, RiHospitalLine, RiPhoneLine, RiFirstAidKitLine } from "@remixicon/react";

export default function Header() {
  return (
    <header>
        <div>
            <div className="left">

                <p>Book Appointments <br /> With Trusted Doctors</p>
                <div>
                    <img src="../assets/assets_frontend/group_profiles.png" alt="" />
                    <p>Simply browse through our extensive list of trusted doctors, <br /> schedule your appointment and use our benefits</p>
                </div>

                <a href="#speciality">
                    Book an Appointment <RiArrowRightLine className='arrow' />
                </a>
            </div>

            <div className="right">
                <img src={header} alt="" />
            </div>
        </div>

        <div className="cards">
            <div className="card">
                <span><RiHospitalLine /> Hospitality</span>
                <p>Clinical excellence must be the priority for any healthcare service provider</p>
                <a href="#speciality">Book an appointment</a>
            </div>

            <div className="card">
                <span><RiPhoneLine /> Emergency Care</span>
                <p>Clinical excellence must be the priority for any healthcare service provider</p>
                <button>+123 456 789</button>
            </div>
            <div className="card">
                <span><RiFirstAidKitLine /> Chamber Service</span>
                <p>Clinical excellence must be the priority for any healthcare service provider</p>
                <a href="#speciality">Book an appointment</a>
            </div>
        </div>
    </header>
  )
}
