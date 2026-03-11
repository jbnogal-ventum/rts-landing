
import { Typography, Button } from "../";
import logo from "../../assets/logos/R_.svg";
import { useNavigate } from "react-router-dom";
import { useTransition } from "../Transition/Transition";
export default function Footer() {
  const { go } = useTransition();
  return (
    <footer>
      <div className="py-7 md:px-6.5 px-3 flex flex-col md:flex-row gap-7 bg-background-interactive justify-between align-start ">
        <div className="flex flex-col md:flex-row gap-4 items-start md:align-center">
          <img
            src={logo}
            alt="RTS Logo"
            className="h-logo-lg md:h-logo-md w-auto filter brightness-0 invert"
          />
          <Typography
            variant="headline-small"

          >
            SPARK INDUSTRIAL<br />BRILLIANCE
          </Typography>
        </div>

        <div className="flex flex-col md:flex-row md:gap-9 gap-6">
          <div className="flex flex-col gap-3">
            <Typography
              variant="title-body"
              className="font-bold font-haffer"
              children="Departments"
            />
            <Button variant='navbar-text-dark' onClick={() => go("/automation-controls")} className=''>Automation & Controls</Button>
            <Button variant='navbar-text-dark' onClick={() => go("/digital")} className=''>Digital Skills</Button>
            <Button variant='navbar-text-dark' onClick={() => go("/energy")} className=''>Energy & Infrastructure</Button>
          </div>

          <div className="flex flex-col gap-3">
            <Typography
              variant="title-body"
              className="font-bold font-haffer"
              children="Resources"
            />
            <Button variant='navbar-text-dark' className=''>Media kit</Button>
          </div>

          <div className="flex flex-col gap-3 md:hidden">
            <Typography
              variant="title-body"
              className="font-bold font-haffer"
              children="Policy"
            />
            <Button variant='navbar-text-dark' className=''>Privacy Policy</Button>
            <Button variant='navbar-text-dark' className=''>Cookie Settings</Button>
          </div>
        </div>
      </div>

      <div className="flex justify-center md:justify-between items-center px-6 py-3 md:py-0">
        <div className=" gap-6  hidden md:flex">
          <Typography variant="body-sm" children="Privacy Policy" />
          <Typography variant="body-sm" children="Cookie Settings" />
        </div>

        <Typography variant="body-md" className="text-secondary md:text-body-sm" children="All Rights Reserved ©2025 RTS Group" />

        <div className=" gap-6 hidden md:flex">
          <Button variant="text-dark" children={"LinkedIn"} className="text-body-sm " onClick={() => window.open("https://ar.linkedin.com/company/rts-group-acds", "_blank")} />
          <Button variant="text-dark" children={"Youtube"} className="text-body-sm " onClick={() => window.open("https://www.youtube.com/@RockingTheIndustry", "_blank")} />
          <Button variant="text-dark" children={"Discord"} className="text-body-sm " onClick={() => window.open("https://discord.com/invite/rtsgroup", "_blank")} />
        </div>
      </div>

    </footer>
  );
}
