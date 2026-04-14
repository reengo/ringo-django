import { useState, useEffect } from 'react';
import api from '../api';

export function usePosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        api.get('/api/posts/')
            .then((res) => {
                const data = res.data;
                // handle both plain arrays and DRF paginated responses { results: [] }
                setPosts(Array.isArray(data) ? data : (data?.results ?? []));
            })
            .catch((err) => setError(err))
            .finally(() => setLoading(false));
    }, []);

    return { posts, loading, error };
}

export function usePost(id) {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        api.get(`/api/posts/${id}/`)
            .then((res) => setPost(res.data))
            .catch((err) => setError(err))
            .finally(() => setLoading(false));
    }, [id]);

    return { post, loading, error };
}
