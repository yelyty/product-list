import type { ReactNode } from "react";

type CatalogToolbarWrapperProps = {
  children: ReactNode;
};

const CatalogToolbarWrapper = ({ children }: CatalogToolbarWrapperProps) => {
  return (
    <div
      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 
                    rounded-xl border bg-white px-4 py-4 shadow-sm mb-6"
    >
      {children}
    </div>
  );
};

export default CatalogToolbarWrapper;
