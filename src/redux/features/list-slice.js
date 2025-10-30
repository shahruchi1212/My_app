import { createSlice } from "@reduxjs/toolkit";
import { detailsService, listService } from "../apis/list";

const initialState = {
    items: [],       
    isLoading: false,   
    isRefreshing: false, 
    error: null,       
    skip: 0,            
    limit: 10,         
    canLoadMore: true,  
    detailItem: null,       
    isDetailLoading: false, 
    detailError: null,      
};

const listSlice = createSlice({
    name: "list",
    initialState,

    reducers: {
        clearListError: (state) => {
            state.error = null;
        },
        resetListState: (state) => {
            state.items = [];
            state.skip = 0;
            state.canLoadMore = true;
            state.isLoading = false;
            state.error = null;
        },
        clearDetailState: (state) => {
            state.detailItem = null;
            state.isDetailLoading = false;
            state.detailError = null;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(listService.pending, (state, action) => {
                if (action.meta.arg.skip === 0) {
                    state.isRefreshing = true;
                } else {
                    state.isLoading = true;
                }
                state.error = null;
            })
            .addCase(listService.fulfilled, (state, action) => {
                if(action.payload)
                {
                const newItems = action.payload.data || action.payload.users || action.payload; 
                
                state.isRefreshing = false;
                state.isLoading = false;
                
                state.items = state.skip === 0 
                    ? newItems
                    : [...state.items, ...newItems];

                state.skip = newItems.length;
                
                state.canLoadMore = newItems.length === state.limit;
                }
                else{
                    state.isLoading = false;
                    state.isRefreshing = false;
                }
            })
            // FETCH REJECTED
            .addCase(listService.rejected, (state, action) => {
                state.isRefreshing = false;
                state.isLoading = false;
                state.error = action.payload?.message || 'Failed to fetch list.';
            });

            builder
            .addCase(detailsService.pending, (state) => {
                state.isDetailLoading = true;
                state.detailError = null;
            })
            .addCase(detailsService.fulfilled, (state, action) => {
                state.isDetailLoading = false;
                state.detailItem = action.payload; 
            })
            .addCase(detailsService.rejected, (state, action) => {
                state.isDetailLoading = false;
                state.detailError = action.payload?.message || 'Failed to fetch details.';
            });
    },
});

export const { clearListError, resetListState , clearDetailState } = listSlice.actions;
export default listSlice.reducer;