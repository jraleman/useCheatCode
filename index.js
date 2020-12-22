import { useState, useEffect } from 'react';

const useCheatCodes = ({}) => {
    const [activeCheats, setActiveCheats] = useState({});
    const [inactiveCheats, setInactiveCheats] = useState({});

    useEffect(() => {
        console.log('addListener - keys');
	return () => {
	    console.log('removeListener - keys');
	};        
    }, []);

    return [activeCheats, inactiveCheats];
};

export default useCheatCodes;
