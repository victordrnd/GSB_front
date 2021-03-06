#!/bin/sh

cp ./src/environments/environment.ts.example  ./src/environments/environment.ts

echo "export const environment = {
    \"production\": true, 
    \"isMockEnabled\": false, 
    \"authTokenKey\": 'token',
    \"trialMode\" : true,
    \"apiUrl\": \"${API_URL}\",
    \"publicUrl\": \"${PUBLIC_URL}\",
    \"localUrl\" : \"http://localhost:4200\",
    \"assetsUrl\" : \"http://localhost:8000/storage/images/\",
    \"firebase\": {
    \"apiKey\": \"AIzaSyArEc4pfVdzPuZQsEPMBUJXhmTom0_tLgw\",
    \"authDomain\": \"gsb-laboratoire.firebaseapp.com\",
    \"databaseURL\": \"https://gsb-laboratoire.firebaseio.com\",
    \"projectId\": \"gsb-laboratoire\",
    \"storageBucket\": \"gsb-laboratoire.appspot.com\",
    \"messagingSenderId\": \"994162446040\",
    \"appId\": \"1:994162446040:web:6975b5db229d6ec054d1ad\"
  }
};" > ./src/environments/environment.prod.ts
