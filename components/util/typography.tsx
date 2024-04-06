export const H1 = ({ children }: { children: React.ReactNode }) => {
    return <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">{children}</h1>;
};

export const H2 = ({ children }: { children: React.ReactNode }) => {
    return <h2 className="scroll-m-20  text-3xl font-semibold tracking-tight first:mt-0">{children}</h2>;
};

export const H3 = ({ children }: { children: React.ReactNode }) => {
    return <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">{children}</h3>;
};

export const H4 = ({ children }: { children: React.ReactNode }) => {
    return <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">{children}</h4>;
};

export const P = ({ children }: { children: React.ReactNode }) => {
    return <p className="leading-7 [&:not(:first-child)]:mt-6">{children}</p>;
};

export const Large = ({ children }: { children: React.ReactNode }) => {
    return <div className="text-lg font-medium">{children}</div>;
};
