import { Button, Grid } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios'
import { useSelector } from 'react-redux';

const Profile = () => {

    const loggedUser = useSelector((state) => state.user)

    const [loading, setLoading] = useState(false)
    const [url, setUrl] = useState('')

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };


    const uploadImage = async (event) => {

        event.preventDefault()

        const file = event.target.files[0];
        const base64 = await convertBase64(file)
        setLoading(true);
        console.log(base64)
        axios.post("http://localhost:8090/uploadImage", { image: base64 }).then((res) => {
            setUrl(res.data);
            axios.patch(`http://localhost:8090/user/update/${loggedUser.email}`, { url: res.data })
            alert("Image uploaded Succesfully");
        }).then(() => setLoading(false))
            .catch(console.log);
    }

    return (
        <>
            <form>
                <Button variant="contained" component="label">
                    Upload
                    <input onChange={uploadImage} hidden accept="image/*" multiple type="file" />
                </Button>
            </form>
            <a href={url}>{url}</a>
            <img src={url} />

            <Grid container spacing={0}>
                <Grid item xs={12} md={6} lg={4}>

                </Grid>
                <Grid item xs={12} md={6} lg={8}>

                </Grid>
            </Grid>
        </>
    );
}

export default Profile;
