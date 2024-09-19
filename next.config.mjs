/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: "/:g/:u",
                destination: "/:g/:u/standart",
                permanent: true
            },
        ]
    }
};

export default nextConfig;
