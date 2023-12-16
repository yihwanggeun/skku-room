import React, { useEffect, useState } from "react";
import axios from 'axios';

const ContractDetail = ({contractId, type}) => {
    const [contractData, setContractData] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3030/contract')
            .then(response => {
                const contract = response.data.filter(item => item.contractId == contractId);
                setContractData(contract);
                console.log(contractData);
            })
            .catch(error => {
                console.error('아이템 상세 데이터를 가져오는 중 오류 발생', error);
            });
    
        // 컴포넌트가 언마운트되었을 때 isMounted를 false로 설정하여 메모리 누수 방지
        return () => {
        };
    }, []);
    return (
        <div>
            
        </div>
    );
};

export default ContractDetail;