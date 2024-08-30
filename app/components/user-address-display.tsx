export type Address = {
    country: string | null;
    city: string | null;
    zip: string | null;
    address: string | null;
};

type UserAddressDisplayProps = Address;

export default function UserAddressDisplay({
    country,
    address,
    city,
    zip,
}: UserAddressDisplayProps) {
    return (
        <div>
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
