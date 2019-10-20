import { storiesOf } from '@storybook/vue';

import Title from '../src/components/Title.vue';
import Flag from '../src/components/Flag.vue';
import MapPOP from '../src/components/MapPOP.vue';
import Confirm from '../src/components/Confirm.vue';

import {boolean, withKnobs} from "@storybook/addon-knobs/dist/index";
import { action } from "@storybook/addon-actions/dist/index";


storiesOf('제목', module)
    .add('기본형', () => ({
        components: { Title },
        template: `<Title :count="57">슈슈</Title>`
    }))


storiesOf('아이콘 관련 UI', module)
    .add('갔다왔어요/가고싶어요', () => ({
        components: { Flag },
        template: `<Flag :review="33" :wish="41" />`
    }))

const stories = storiesOf('팝업 UI', module)
// Add the `withKnobs` decorator to add knobs support to your stories.
// You can also configure `withKnobs` as a global decorator.
stories.addDecorator(withKnobs);
stories
    .add('맵박스 클릭 팝업', () => ({
        components: { MapPOP },
        template: `<MapPOP 
            v-bind="data"                    
            @clickHeart="clickHeart"
            @clickFlag="clickFlag" />`,
        methods: {
            clickHeart: action('가고싶어요 등록/key'),
            clickFlag: action('갔다왔어요 등록/key'),
        },
        data() {
            return {
                data: [ { eventBus: 'shushu' }]
            }
        }
    }))
    .add('확인 팝업', () => ({
        components: { Confirm },
        template: `<Confirm :flag="isDisabled" @handlceConfirm="handlceConfirm" @handleCancel="handleCancel" />`,
        methods: {
            handlceConfirm: action('확인/key'),
            handleCancel: action('취소/key')
        },
        props: {
            isDisabled: {
                default: boolean('Disabled', true)
            }
        },
        data() {
            return {
                data: [ {
                    title: 'shushu',
                    flag: true
                }]
            }
        },
    }))