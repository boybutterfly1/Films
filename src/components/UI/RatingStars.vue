<script setup lang="ts">
import {onMounted, ref, watch, computed} from "vue";
import {useFilmsStore} from "@/store/films";
import {Film} from "@/types/types";

const filmsStore = useFilmsStore()
const props = defineProps<{
  film: Film | null
}>()
const emptyStar = ref('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFGklEQVR4nO1aWYhcRRQtTdziEncxLkjABQ1+iIoLLh+Cmg/FFfwwahS/NAZF8hOJfwY3cCNEA4kLBKIIMRhxSzsBRaVxxsl759StN83okDEaMWoCJjHLk1tz39DOZKY75nWnGzxQ0Lyqd27delV3q3bufzRGnueHCvlFIHv0t+tWSJreEMhcm/523YpAriwU0d+uG5EkyYkCbBdgt7UdAE5y3QYh58UvAawV4KO4vch5rtsQyF7bUncE8k5Tqt91E0heahP/NYRwRJIkhwvwiz7TPtctEGCJKfJ88SyQL8TtBSxx3YChoaGjhPw9KpIkFxbPvfcXCLBXgD+Gq9VprtMhwBxb+S/H9ZFfWd8c1+kIZI8d8rnj+tL0QevrcZ0MAOfp9gnkNpLHju1PkuSYAGxVZXSruU6FkIttxd+YZMwy8ynPuE5EpVKZGoBhs1ZXTDQuA640RX6uVquHuU5D5v2tpgQbjRUy1bEZeYvrNAjwQdz7wOMNx5JPmPVa7dqJ4Wp1WgjhFBGZmQGXSJpeK2k6O/P+LiEfFvLJQO4K5E4d14hPx8Sx5C59VzkiV5rOVu4oQ2Smjmva52Rpem8gVwjwXiA/DcA3+umF/EHILQLsqQvFJ20CrGp2cQR4dz9498S5jMwp1TnqXG3OK1QHJdzcBNH2GDcBNSG/C+R6i2pXBfJ1IV8MwCIApzerCMkZ+k58VzmUC1ir3FEGUFOZUXbj+W3WQ3qThg12ULdm3t89AMwiec6P/f0n5Hk+xR1k5Hk+Reeic9K56RwLf6RzVx3iwIE0PTcAKCLWjLzedSgy8iohN5kJz+rjuYgQwnGF5YmHEHjEdRg88JAZCVXiY/1KE37COu+sbWknOK1KpTJ17Lz0WcMXBbhHgL/spfUDAwOnuoOY+wfyMzsPOwL5wH4RRFtODtm5qekhc20GyfMD4G1Bf5os9GlENCOQXxvRNgFuc22CqHM0a6rmuJYkZx8QoebcAVhun3av7tVWVg3zPD8kAAvqHPHKUjNKDSMsDIkevK+v72hXMgYHB48U4G2TsVsVcq2A9/7m0Xyc7M02bDirLG7lClZCUhkqy7XtAALLy+LVmCmMcHqVURZvI6GvmNBFpXECi4zz5bI4mxFKy7uvLotTucKIInDtgJnkGGCW6fWj9wb+jNwhnOlaDQHuswO5pnRuck3b6l5CvmVfZH7Z3AGYbxbxzbK59yVsowprRcgyAMyyRRpWx+haBY39bVttakaQmlG9G9HWTEEuV6+uMdWYunHLLm/U+zZR41owJk39W8MbvWKYVAbwji3Wo6UrUCdktU1qwlBaRC4PwPd1sdmy2EZKqfGyR8dM+D55f0tLRWYeYzS6r9DErhMWxxjJQv/6m1xJ02sK/2MB4VKtBY9TROSMVpj3caVODSHG9gXgOiFDkSYH4KV9BZWm7NNFuhqAwYy8cRwfKY1Kr/8ZAXjKJvpq8Wywt/d4Xdm6bdPnvb+sEZf3/uIAfFtfD/Pen1z0C/manZOFpSti/2DIi+QqVgbtXlDTYl3p/dkK0SCQj2nCZgr9pqlClAXcbryVUpXQxEbzZd3/WZpeFMj366zR+gOJVrU0KuQndXwf6hezs7az1LxHC2DFyo8WxsgteitVhuMy/zHXOONBL4ofo8W3MhCA5/5VoiTXqHVxJaPW33/aaAhUNODZ0gQIsM5IN+o9iGvHXQtGQqEAfF4asZnXhbVabbprE2q12nSVqbLbJbMj8A8Oaqfo4EiAVQAAAABJRU5ErkJggg==')
const activeStar = ref('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADiUlEQVR4nO2aT4hXVRTHz5hmm8x/zTvnN5MSiKFWCxMRAt0IBW6SUIhMhLSFCtZGiRZBIUSLwoWCEFSCG5EiEgX/MMw75/ebUQZcaKGBLgo1cFGiWb93TnPjzk+Hnzgzv/f03fd7D/rC2d57P/ece+69516A/9VZbmDhUyY0ZExnnIMeqKosprdMyHlL6rgaqioTPHkfRJm+hirKDff1q5CNgwjdccNzZ0HVZIIf34dos61QJTkHPSp05SEQxgZUScq1tRN4Y8xcjEuhKlLBw5OBKNPnUAW5kTnPKONfU4D87kZgBpRdxtGOySDGYWJ6A8ouExrpBGKMP0CZ1Wz0vtQRorWnqBucT1BWKeO+NCD3bDeUUe7i0idV8GZaEBW8XMqDpHG0MYM3WgfJmF6FssmETmQFUcGvCh2kG1g42x8C3RAuSRrRSr9zq+CbJtEWY9ppgh+1HxDTg9BtY9pjMW43xs3KtN63nQiucFJ7wTX6+1IfNE1omwodMsHvTPCUT5/KeEkZrynTrayDC2XK9Kcy/qZMPxvTubGxMh1VoW+McQP443W3B/nYkEJXQGN83dN2ezCP5ak6vdZaA43+RSr0U/U8gb/4dfvggpZ5T5vg990enKW34z4JTZydHPT4LKJM/5Y4lEZV8DPnYFrnTMa4oYxJQAX/NsFNkEXNuO9lFbpaIohfE6ZXMkGMh9rZ2jxjPN1tCGOMXT3qfSSIcZgBmO5jsnueoIO53ihN6G1lvFtgKP1jTO9CCDUHabmP1QK8cD3h3lUQUk6eq7XOOqHWA53zfUARUsEvg3mD6QsoSiZ0MaBHLhQC4QaeRb+7BvTIaCGFCX8BCr3YLcZ3goO0LmFhQVTo2yKq7NcLALkRtMLSrEcvBg8raVmTo2XBQIzp/aJAjGlXSJBjmUKEKVHGvS2jJCPIsYCVRLqdfiB4vv3YPVYXZjqbYZ3ccccXzcwdJIlxTTov4F1/y3RH4ImHJsPBNGN6L+2EJCGetFXo0xThMOji2uJObbnB6Pn2p+spvPJJ7iAmNDx5h/iHn+msKbN1pZ6y8D2UK4SvVkxREv3RlzYfue2h3miyTVaFzPGCObmB+JrsBJ3c8PXf3PqoR+smuuvk+kynTAfaUuqon0HX6J8LYR5S97WXo1Rof24dmKDcWwuXi/gck9Rxte8r908GvmFj+tB/W4JCv0jhBz7tF9VnKfQfFFqnRXm5TeMAAAAASUVORK5CYII=')

const rating = ref<number | null>(null)
const hoveredStar = ref<number | null>(null)
const selectedStar = ref<number | null>(null)

const mouseover = (index: number):void => {
  hoveredStar.value = index
  rating.value = hoveredStar.value
}
const mouseout = () => {
  hoveredStar.value = null
  if (selectedStar.value && selectedStar.value >= 0) {
    rating.value = selectedStar.value
  } else {
    rating.value = null
  }
}
const selectStar = (star: number) => {
  selectedStar.value = star
  rating.value = selectedStar.value
  props.film ? props.film.userRating = rating.value : 0;
  if (!filmsStore.ratedFilms.some(film => props.film ? film.id === props.film.id : 0)) {
    props.film ? filmsStore.ratedFilms.push(props.film) : 0
    const savedFilm = filmsStore.savedFilms.find(film => props.film ? film.id === props.film.id : null)
    if (savedFilm) {
      savedFilm.userRating = rating.value
    }
  }
}

onMounted(() => {
  const film = filmsStore.ratedFilms.find(film => props.film ? props.film.id === film.id : null)
  if (film) {
    selectedStar.value = film.userRating ? film.userRating : null
    rating.value = film.userRating ? film.userRating : null
  }
  console.log(rating.value, hoveredStar.value, selectedStar.value)
})
// const mount1 = () => {
//   console.log('mount1')
//   const film = ref(filmsStore.ratedFilms.find(film => props.film.id === film.id))
//   if (film.value) {
//     selectedStar.value = film.value.userRating !== undefined ? film.value.userRating - 1 : 0
//     rating.value = film.value.userRating !== undefined ? film.value.userRating : undefined
//   }
// }
// const mount2 = () => {
//   console.log('mount2')
//   const film = ref(filmsStore.ratedFilms.find(film => props.film.id === film.id))
//   if (film.value) {
//     selectedStar.value = film.value.userRating !== undefined ? film.value.userRating - 1 : 0
//     rating.value = film.value.userRating !== undefined ? film.value.userRating : undefined
//   }
// }
//
// watch(() => {filmsStore.ratedFilms.length}, () => {
//   mount1();
// }, {deep:true})
// watch(() => {filmsStore.ratedFilmsOrderChanged}, () => {
//   mount2()
// })
</script>

<template>
  <div class="rating">
    <div
      v-for="(star) in 10"
      :key="star"
      class="stars"
      @mouseover="mouseover(star)"
      @mouseout="mouseout()"
      @click="selectStar(star)"
    >
      <div class="star">
        <img :src="star <= hoveredStar || star <= selectedStar ? activeStar : emptyStar" alt="star">
      </div>
    </div>
    <span>Your Rating: {{rating}}</span>
  </div>
</template>

<style lang="scss" scoped>
.rating {
  display: flex;
  align-items: center;
}
.rating span {
  margin-left: 30px;
  width: 130px;
}
.stars {
  display: inline-block;
}
.stars img {
  width: 25px;
}
.star:hover {
  transform: scale(1.2);
}
.star {
  padding: 3px 3px 3px 3px;
}
</style>
