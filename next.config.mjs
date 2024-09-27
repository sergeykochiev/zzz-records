/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: "/",
                destination: "/hk4e",
                permanent: true
            },
            {
                source: "/:g/:u",
                destination: "/:g/:u/standart",
                permanent: true
            },
        ]
    }
};

export default nextConfig;
