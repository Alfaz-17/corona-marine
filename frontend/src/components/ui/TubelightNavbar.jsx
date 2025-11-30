import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../../lib/utils";

export function TubelightNavbar({ items, className }) {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(items[0]?.name || "");
  const [isMobile, setIsMobile] = useState(false);

  // Update active tab based on current route
  useEffect(() => {
    const currentItem = items.find((item) => item.url === location.pathname);
    if (currentItem) {
      setActiveTab(currentItem.name);
    }
  }, [location.pathname, items]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={cn(
        "hidden lg:fixed lg:top-6 left-1/2 -translate-x-1/2 z-50 lg:flex",
        className
      )}
    >
      <div className="flex items-center gap-3 bg-marine-navy/90 border border-marine-aqua/30 backdrop-blur-lg py-2 px-2 rounded-full shadow-2xl">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.name;

          return (
            <Link
              key={item.name}
              to={item.url}
              onClick={() => setActiveTab(item.name)}
              className={cn(
                "relative cursor-pointer text-sm font-bold px-6 py-2 rounded-full transition-colors uppercase tracking-wider",
                "text-neutral-graylight hover:text-marine-aqua",
                isActive && "bg-marine-blue/30 text-marine-aqua"
              )}
            >
              {item.name}
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-marine-aqua/10 rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-marine-aqua rounded-t-full">
                    <div className="absolute w-12 h-6 bg-marine-aqua/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-marine-aqua/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-marine-aqua/20 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
