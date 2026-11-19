
export const uploadImage = async (file : File) => {
    const formData = new FormData()
    formData.append("image", file)

    try {
         const res = await fetch(`https://api.imgbb.com/1/upload?&key=176f3ea46553b0e07c37bfdcf3a8daec`,{
        method : "POST",
        body : formData
     });
     const data = res.json()
     return data
    } catch (error) {
         console.error('Error uploading file:', error)
    } 

}