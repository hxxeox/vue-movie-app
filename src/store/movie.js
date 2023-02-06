import axios from 'axios'
import _uniqBy from 'lodash/uniqBy'
const _defaultMessage = 'Search for the movie title!'

export default {
    namespaced: true,
    state: () => ({
        movies: [],
        message: _defaultMessage,
        loading:false,
        theMovie:{}
    }),
    getters: {},
    mutations: {
        updateState(state, payload) {
            // ['movies', 'messsage', 'loading']
            Object.keys(payload).forEach( key => {
                state[key] = payload[key]
            })
        },
        resetMovies(state) {
            state.movies = []
            state.message = _defaultMessage
            state.loading = false
        }
    },
    actions: {
        async searchMovies({ state, commit }, payload) {
            if (state.loading) return
            commit('updateState',{
                message:'',
                loading:true
            })
            try {
                const res = await _fetchMovie({
                    ...payload,
                    page: 1
                })
                const { Search, totalResults } = res.data
                commit('updateState', {
                    movies: _uniqBy(Search, 'imdbID')
                })
                console.log(totalResults) // 311개의 frozen
                console.log(typeof totalResults) // string
    
                // totalResults는 문자데이터 라서 숫자로 변환해줘야함
                const total = parseInt(totalResults, 10)
                const pageLength = Math.ceil(total / 10)
    
                //추가요청 전송!
                if (pageLength > 1) {
                    for (let page = 2; page <= pageLength; page += 1) {
                        if (page > (payload.number /10)) break
                        const res = await _fetchMovie({
                            ...payload,
                            page
                        })
                        const {Search} = res.data
                        commit('updateState', {
                            movies: [
                                ...state.movies,
                                ..._uniqBy(Search, 'imdbID')
                            ]
                        })
                    }
                }
            } catch({message}) {
                commit('updateState', {
                    movies:[],
                    message
                })
            } finally {
                commit('updateState',{
                    loading:false
                })
            }
        },
        async searchMovieWithId({state, commit}, payload) {
            if(state.loading) return
            commit('updateState', {
                theMovie:{},
                loading:true
            })
            try {
                const res = await _fetchMovie(payload)
                console.log(res.data)
                commit('updateState', {
                    theMovie:res.data
                })
            } catch (error) {
                commit('updateState', {
                    theMovie:{}
                })
            } finally {
                commit('updateState',{
                    loading:false
                })
            }
        }

    },
}

async function _fetchMovie(payload) {
    return await axios.post('/.natlify/functions/movie',payload)
}