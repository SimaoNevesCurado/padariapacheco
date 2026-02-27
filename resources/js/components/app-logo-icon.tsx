import { SVGAttributes } from 'react';
import logo from "../../images/IconOnly.png"

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <img src={logo} alt="Logo da Padaria"  className="bg-[#FAFAFA] w-auto h-28 object-contain" />

    );
}
