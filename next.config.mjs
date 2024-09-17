/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: "/:g",
                destination: "/:g/standart",
                permanent: true
            },
        ]
    }
};

export default nextConfig;
