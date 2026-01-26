import { Typography, Button } from "../index";
import { cn } from '../../lib/utils'
import { col } from "framer-motion/client";
export default function Table({
  columns = ["Service", "Focus", "Description", "Main technologies"],
  rows = [],
  mode = 'light'
}) {
  const isLightMode = mode === "light";
  return (
    <section className="w-full h-full">
      {/* VERSION DESKTOP - Table */}
      <div className=" flex-col gap-5 h-full hidden md:flex scroll-horizontal-allowed">
        {/* Header sticky - Siempre visible al scrollear */}
        <div className={cn(isLightMode ? ` bg-background-primary ` : `bg-background-inverse`, `sticky top-[100px] z-10 rounded-md  p-3 gap-4 grid grid-cols-4`)}>
          {columns.map((c, i) => (
            <Typography
              key={c + i}
              children={c}
              variant="subtitle-lg"
              className={isLightMode ? "text-text-primary" : "text-text-on-white-primary"}
            />
          ))}
        </div>

        {/* Rows - Contenedor con scroll */}
        <div className={cn("flex-1 overflow-y-auto", isLightMode ? "text-text-on-white-secondary" : "text-text-secondary")}>
          <div className="flex flex-col gap-4 pb-4">
            {rows.map((r, rowIndex) => (
              <div
                key={rowIndex}
                className={`rounded-md p-3 gap-4 grid grid-cols-4  md:grid`}
              >
                {r.map((c, colIndex) => (
                  <div key={`${rowIndex}-${colIndex}`} className="flex">
                    {Array.isArray(c.children) ? (
                      <ul className="flex flex-col list-disc pl-4">
                        {c.children.map((item, itemIndex) => (
                          <li key={`${rowIndex}-${colIndex}-${itemIndex}`}>
                            <Typography
                              children={` ${item}`}
                              variant={c.variant}
                            />
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="flex flex-col items-start gap-2">
                        
                        <Typography
                          children={c.children}
                          variant={c.variant}
                          className={cn(
                            "whitespace-pre-line",
                            isLightMode
                              ? colIndex === 0
                                ? "text-text-on-white-primary"
                                : "text-text-on-white-secondary"
                              : colIndex === 0
                                ? "text-text-primary"
                                : "text-text-secondary"
                          )}
                        />
                        {c.Icon && (
                          <div className="flex items-center justify-center ">
                           
                              <div className="">
                                {c.Icon}
                              </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* VERSION MOBILE - Cards */}
      <div className="flex flex-col gap-5 h-full md:hidden">
        {rows.map((r, rowIndex) => (
          <div
            key={rowIndex}
            className={cn("relative flex flex-col gap-4 rounded-md p-[0.8px]")}
            style={{
              backgroundImage: 'linear-gradient(90deg, #7513FF, #4348F3, #0093CE)'
            }}
          >
            {/* Fondo interior */}
            <div className={cn("rounded-md  py-6 px-3 flex flex-col gap-4", isLightMode ? 'bg-background-inverse-hover text-text-on-white-secondary' : "bg-background-soft text-text-secondary ")}>
              {r.map((c, colIndex) => (
                <div key={`${rowIndex}-${colIndex}`} className="flex ">
                  {Array.isArray(c.children) ? (
                    <ul className="flex flex-col list-disc pl-4">
                      {c.children.map((item, itemIndex) => (
                        <li key={`${rowIndex}-${colIndex}-${itemIndex}`}>
                          <Typography
                            children={` ${item}`}
                            variant={c.variant}
                          />
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="flex flex-col items-start gap-2">
                      {c.Icon && (
                      <div className="flex items-center justify-center">
                        <div className="w-6 h-6">
                          {c.Icon}
                        </div>
                      </div>
                    )}
                    <Typography
                      children={c.children}
                      variant={c.variant}
                      className={cn("whitespace-pre-line", colIndex === 0 && (isLightMode ? "text-text-on-white-primary" : "text-text-primary"))}
                    />
                    
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}