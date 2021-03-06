
export const fileUpload = async ( file ) => {
    
    const cloudUrl = 'https://api.cloudinary.com/v1_1/dcsutpqkl/upload';
    const formData = new FormData();
    formData.append('upload_preset','stories-app');
    formData.append('file', file );

    try {
        
        const resp = await fetch( cloudUrl, {
            method: 'POST',
            body: formData
        });

        if ( resp.ok ) {
            const cloudResp = await resp.json();
            return cloudResp.secure_url;
        } else {
            return null;
        }

    } catch (err) {
        throw err;
    }

}

export const filesUpload = async( images ) => {

    let urlArray = [];

    try {

        for (const file of images) {
            const clouResp = await fileUpload(file);
            urlArray = [...urlArray, clouResp];
        }

        return urlArray;

    } catch (error) {
        console.log(error);
    }

}