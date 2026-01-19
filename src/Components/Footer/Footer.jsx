
import { Typography, Button } from "../";
import logo from "../../assets/logos/R_.svg";
export default function Footer() {
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

        <div className="flex flex-col md:flex-row gap-7">
          <div className="flex flex-col gap-3">
            <Typography
              variant="title-body"
              className="font-bold font-haffer"
              children="Departments"
            />
            <Typography variant="body-md" className='font-haffer font-medium'>Automation & Controls</Typography>
            <Typography variant="body-md" className='font-haffer font-medium'>Digital Skills</Typography>
            <Typography variant="body-md" className='font-haffer font-medium'>Energy & Infrastructure</Typography>
          </div>

          <div className="footer-column">
            <Typography
              variant="title-body"
              className="font-bold font-haffer"
              children="Departments"
            />
            <Typography variant="body-md" className='font-haffer font-medium'>Media kit</Typography>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center px-6 hidden md:flex">
        <div className="flex gap-6">
          <Typography variant="body-sm" children="Privacy Policy" />
          <Typography variant="body-sm" children="Cookie Settings" />
        </div>

        <Typography variant="body-sm" className="text-text-disabled" children="All Rights Reserved ©2025 RTS Group" />

        <div className="flex gap-6">
          <Button variant="text-dark" children={"LinkedIn"} className="text-body-sm " onClick={() => window.open("https://www.linkedin.com/company/rtsgroup/")} />
          <Button variant="text-dark" children={"Youtube"} className="text-body-sm " onClick={() => window.open("https://www.youtube.com/@rts_group")} />
          <Button variant="text-dark" children={"Discord"} className="text-body-sm " onClick={() => window.open("https://discord.com/invite/rtsgroup")} />
        </div>
      </div>

    </footer>
  );
}
