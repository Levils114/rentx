export interface AccessoriesProps{
   id: string,
   car_id: string,
   name: string,
   type: string,
}

export interface PhotosProps{
   id: string,
   car_id: string,
   photo: string,
}

export interface CarProps{
   about: string,
   accessories: AccessoriesProps[],
   brand: string,
   fuel_type: string,
   id: string,
   name: string,
   photos: PhotosProps[],
   period: string,
   price: number,
   thumbnail: string,
};