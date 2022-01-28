import AccelerationIcon from './../assets/acceleration.svg';
import SpeedIcon from './../assets/speed.svg';
import HybridIcon from './../assets/hybrid.svg';
import ExchangeIcon from './../assets/exchange.svg';
import PeopleIcon from './../assets/people.svg';
import ForceIcon from './../assets/force.svg';
import GasolineIcon from './../assets/gasoline.svg';
import EnergyIcon from './../assets/energy.svg';
import CarSvg from './../assets/car.svg';

export function getCorrectAccessoryIcon(acessory_type: string){
   switch(acessory_type){
      case 'speed':
         return SpeedIcon;
      case 'acceleration':
         return AccelerationIcon;
      case 'hybrid_motor':
         return HybridIcon;
      case 'exchange':
         return ExchangeIcon;
      case 'seats':
         return PeopleIcon;
      case 'turning_diameter':
         return ForceIcon;
      case 'gasoline_motor':
         return GasolineIcon;
      case 'electric_motor':
         return EnergyIcon;
      default:
         return CarSvg;
   }
}