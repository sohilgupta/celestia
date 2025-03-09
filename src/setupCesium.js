// This file sets up Cesium to work with React
import { Ion } from 'cesium';

// Replace with your own Cesium Ion access token if needed
// You can create one for free at https://cesium.com/ion/
Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlYWE1OWUxNy1mMWZiLTQzYjYtYTQ0OS1kMWFjYmFkNjc5YzciLCJpZCI6NTc3MzMsImlhdCI6MTYyMjY0NjQ5NH0.XcKpgANiY22ejJvPUsPHZ1LZ5c0-8RAxfWQ_F_I_p8s';

// Ensure Cesium's static files are properly loaded
window.CESIUM_BASE_URL = '/'; 