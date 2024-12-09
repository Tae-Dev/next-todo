'use client';

import React, { useEffect } from 'react'

function FetchDataPage() {
  useEffect(() => {
    fetch('/api/get-users')
      .then((res) => res.json())
      .then((data) => {
      })
      .catch((error) => {
        console.error('Error fetching data from API:', error);
      });
  }, []);
    
  return (
    <div>FetchDataPage</div>
  )
}

export default FetchDataPage