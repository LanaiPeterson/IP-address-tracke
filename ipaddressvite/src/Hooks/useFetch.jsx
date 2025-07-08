
function useFetch(url) {
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error('Fetch error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    // State to hold the fetched data and loading status
  const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
}

export default useFetch;