import { storiesOf } from '@storybook/vue';
import { action, decorate, configureActions } from '@storybook/addon-actions';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';

import ListBasic from '../src/components/ListBasic.vue';
import ListCardVer from '../src/components/ListCardVer.vue';
import ListCardHor from '../src/components/ListCardHor.vue';
import PhotoReview from '../src/components/PhotoReview.vue';
import DetailPOI from '../src/components/DetailPOI.vue';
import ShowReviewState from '../src/components/ShowReviewState.vue';

const temp = {
    isInterest: 'Y',
    friendCmn: '5757',
    intro: '어디또 공식 서포터즈 1기 슈슈입니다'
}

const stories = storiesOf('리스트', module)
// Add the `withKnobs` decorator to add knobs support to your stories.
// You can also configure `withKnobs` as a global decorator.
stories.addDecorator(withKnobs);


stories
    .add('기본형', () => ({
            components: { ListBasic },
            template: `<ListBasic 
                v-bind="data"                    
                @imgClick="imgClick" 
                @handleCheck="handleCheck"
                @remove="remove" />`,
            methods: {
                imgClick: action('상세보기/friendCmn'),
                remove: action('구독취소/friendCmn'),
                handleCheck: action('체크박스/friendCmn'),
            },
            data() {
                return {
                    data: [ temp ]
                }
            }
        }))
    .add('카드 세로', () => ({
        components: { ListCardVer },
        template: `<ListCardVer 
            v-bind="data"                    
            @imgClick="imgClick" 
            @setJoin="setJoin" />`,
        methods: {
            imgClick: action('상세보기/cmn'),
            setJoin: action('구독신청/cmn'),
        },
        data() {
            return {
                data: [ temp ]
            }
        }
    }))
    .add('카드 가로', () => ({
        components: { ListCardHor },
        template: `<ListCardHor 
            v-bind="data"                    
            @move="move" 
            @remove="remove" />`,
        methods: {
            move: action('가고싶어요 상세보기/cmn'),
            remove: action('가고싶어요 삭제/cmn'),
        },
        data() {
            return {
                data: [ temp ]
            }
        }
    }))

storiesOf('상세보기', module)
    .add('기본정보', () => ({
        components: { DetailPOI },
        template: `<DetailPOI v-bind="data" />`,
        methods: {
            move: action('가고싶어요 상세보기/cmn'),
            remove: action('가고싶어요 삭제/cmn'),
        },
        data() {
            return {
                data: [ temp ]
            }
        }
    }))
    .add('평점 리뷰', () => ({
        components: { ShowReviewState },
        template: `<ShowReviewState v-bind="data" />`,
        methods: {
            move: action('가고싶어요 상세보기/cmn'),
            remove: action('가고싶어요 삭제/cmn'),
        },
        data() {
            return {
                data: [{
                    cgoodCount: 2,
                    greatCount: 0,
                    poorCount: 0,
                    reviewAverageCode: "GREAT",
                    reviewAverageName: "강추",
                    reviewAveragePoint: 3.4,
                    reviewCount: 4,
                    sosoCount: 2,
                }]
            }
        }
    }))
    .add('포토 후기 사진', () => ({
        components: { PhotoReview },
        template: `<PhotoReview v-bind="data" />`,
        methods: {
            move: action('가고싶어요 상세보기/cmn'),
            remove: action('가고싶어요 삭제/cmn'),
        },
        data() {
            return {
                data: [{
                    photoCount: 23,
                    photos: [
                        {
                            "path": "2bc4df2f5a7c478db6a3369defd23a5d",
                            "name": "Lighthouse3.jpg",
                            "createDate": "2019-09-25 13:38:08"
                        },
                        {
                            "path": "fd3fbe79b25747c9bc3704aa314b985c",
                            "name": "Lighthouse3.jpg",
                            "createDate": "2019-09-24 10:09:41"
                        },
                        {
                            "path": "42bcfea991ac4ea394c7843495bdba6c",
                            "name": "Lighthouse3.jpg",
                            "createDate": "2019-09-24 10:07:22"
                        },
                    ],
                    tags: ['SHUSHU'],
                }]
            }
        }
    }))

