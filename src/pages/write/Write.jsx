import React, { useContext, useState } from 'react'
import { Context } from '../../context/Context';
import axios from 'axios';
import NavBar from '../../components/navbar/NavBar';

export default function Write() {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState(null);
    const { user } = useContext(Context);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            username: user.username,
            title,
            desc,
        };
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            newPost.photo = filename;
            try {
                await axios.post("/upload", data);
            } catch (err) { }
        }
        try {
            const res = await axios.post("/posts", newPost);
            window.location.replace("/post/" + res.data._id);
        } catch (err) { }
    };
    return (
        <><NavBar /><div className='write'>
            {file && (
                <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
            )}

            <form className='writeForm' onSubmit={handleSubmit}>
                <div className='writeFormGroup'>

                    <input type="file" id='fileInput' onChange={(e) => setFile(e.target.files[0])} />

                    <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Base input</label>
                    <input type="text" id="base-input" autoFocus={true} onChange={e => setTitle(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                </div>

                <label for="large-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Large input</label>
                <input type="text" id="large-input" onChange={e => setDesc(e.target.value)} class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                <button className="writeSubmit" type="submit">
                    Publish
                </button>
            </form>
        </div></>
    )
}
