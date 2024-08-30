type UserAddressDisplayProps = {
    country: string;
    city: string;
    zip: string;
    address: string;
};

export default async function UserAddressDisplay({
    country,
    address,
    city,
    zip,
}: UserAddressDisplayProps) {
    return (
        <div>
            <h1 className="font-semibold text-lg">Delivering to:</h1>
            <p>
                <span className="font-semibold">Country: </span>
                {country}
            </p>
            <p>
                <span className="font-semibold">Address: </span>
                {address}
            </p>
            <p>
                <span className="font-semibold">City: </span>
                {city}
            </p>
            <p>
                <span className="font-semibold">Zip code: </span>
                {zip}
            </p>
        </div>
    );
}
