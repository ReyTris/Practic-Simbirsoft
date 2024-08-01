import { CarService } from '@/services/car.service'
import { useEffect, useState } from 'react'

export interface IRateCar {
    rate: string
}

export const useRateCar = (id: number): IRateCar => {
    const [rate, setRate] = useState<string>(null)


    useEffect(() => {
        const fetchRate = async () => {
            try {
                const {data} = await CarService.getRateCar(id)
                
                if (data !== null) {
                    setRate(data.price)
                } else {
                    setRate("1999")
                }
            } catch (error) {
                console.error(error)
            }
        }

        fetchRate()
    }, [])

    return {rate}
}