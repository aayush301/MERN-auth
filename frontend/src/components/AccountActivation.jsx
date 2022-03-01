import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { activateAccount } from '../api';
import { SuccessMsg, ErrorMsg } from './alerts';

const AccountActivation = () => {
  const { activationToken } = useParams();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(async () => {
    try {
      const data = await activateAccount(activationToken);
      setSuccess(data.msg);
    }
    catch (error) {
      error && setError(error);
    }
  }, [activationToken]);


  return (
    <div>
      {success && <SuccessMsg msg={success} />}
      {error && <ErrorMsg msg={error} />}
    </div>
  )
}

export default AccountActivation