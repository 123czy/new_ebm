<template>
    <div class="u-full-width u-full-height">

        <div class="table-filter-container ">
            <div class="l-flex-grid u-full-width">


                <div class="u-display-inline u-float-left u-hidden-x u-hidden-s u-p-relative">
                    <a href="#" class="js-full-view">
                        <span class="icon-table-expand-collapse-container">
                            <span class="icon-table-expand-collapse">
                                 <span class="icon-chevron-left-b"></span>
                                 <span class="icon-chevron-right-b"></span>
                             </span>
                        </span>
                    </a>
                </div>

                <div class="u-pt-15 u-pl-30 filter-left">
                    <div class="search-container">
                        <input class="form__field form__input--base form__input search-input"
                               @keyup="search($event)" :placeholder="lang[locale]['search']" id="searchField"
                               name="search"/>
                        <span class="icon-search"></span>
                    </div>

                    <div class="filter-button"><span class="icon-filters" @click="toggleMobileFilter"></span></div>

                    <div :class="['mobile-filter', 'u-hidden-l', 'u-hidden-m', {'open' : isMobileFilter}]">
                        <div class="select-container u-pl-15">
                            <select class="form__field form__input--base form__input search-input" name="industry"
                                    @change="filterChanged($event)">
                                <option selected="selected" value="">{{ lang[locale]['filter-industry'] }}</option>
                                <option v-for="val in filters.industries" :key="val.id" :value="val.id">
                                    {{ val.industry_name }}
                                </option>

                            </select>
                            <span class="icon-chevron-down"></span>
                        </div>

                        <div class="select-container u-pl-15">
                            <select class="form__field form__input--base form__input search-input" name="channel"
                                    @change="filterChanged($event)">
                                <option selected="selected" value="">{{ lang[locale]['filter-channel'] }}</option>
                                <option v-for="val in filters.channels" :value=val.id>
                                    {{ val.name }}
                                </option>
                            </select>
                            <span class="icon-chevron-down"></span>
                        </div>

                        <div class="select-container last u-pl-15 u-hidden-m u-hidden-l">
                            <select class="form__field form__input--base form__input search-input" name="period"
                                    @change="filterChanged($event)">

                                <option v-for="val in filters.periods" :value=val.id>
                                    {{ getWeekTranslate(val.name_with_year) }}
                                </option>

                            </select>
                            <span class="icon-chevron-down"></span>
                        </div>
                    </div>


                    <div class="select-container u-pl-15 u-hidden-x u-hidden-s">
                        <select class="form__field form__input--base form__input search-input" id="industry"
                                name="industry" @change="filterChanged($event)">
                            <option selected="selected" value="">{{ lang[locale]['filter-industry'] }}</option>
                            <option v-for="val in filters.industries" :value=val.id>
                                {{ val.industry_name }}
                            </option>

                        </select>
                        <span class="icon-chevron-down"></span>
                    </div>

                    <div class="select-container u-pl-15 u-hidden-x u-hidden-s">
                        <select class="form__field form__input--base form__input search-input" id="channel"
                                name="channel" @change="filterChanged($event)">
                            <option selected="selected" value="">{{ lang[locale]['filter-channel'] }}</option>
                            <option v-for="val in filters.channels" :value=val.id>
                                {{ val.name }}
                            </option>
                        </select>
                        <span class="icon-chevron-down"></span>
                    </div>

                </div>


                <div class="filter-right u-pt-15 u-hidden-x u-hidden-s">

                    <div class="select-container u-pl-15">
                        <select class="form__field form__input--base form__input search-input" id="period" name="period"
                                @change="filterChanged($event)">

                            <!--<option value="">Select Time period</option>-->
                            <option v-for="val in filters.periods" :value="val.id">
                                {{ getWeekTranslate(val.name_with_year) }}
                            </option>

                        </select>
                        <span class="icon-chevron-down"></span>
                    </div>

                    <span class="btn-purple" @click="resetAllFilter">{{ lang[locale]['reset-filters'] }}</span>
                </div>


            </div>


        </div>

        <div class="text--center u-hidden-x u-hidden-s">
            <div class="table-row table-header text--center">
                <div class="table-column text--xxxs text--medium rank-column"><span v-if="isShowRank"> {{ lang[locale]['rank'] }}
           </span>
                </div>
                <div class="table-column text--xxxs text--medium double"><span class="u-pl-40">{{ lang[locale]['employer-name'] }}</span>
                </div>
                <div class="table-column text--xxxs text--medium composite">{{ lang[locale]['srm-index'] }}
                    <span class="box--ic-right">
                    <span class="icon-sort composite" @click="sortBy('composite')"></span>
                    <i class="icon-help tooltip">
                        <span class="tooltip-text left">{{ lang[locale]['tip-srm-index'] }}</span>
                    </i>
               </span>
                </div>
                <div class="table-column text--xxxs text--medium">{{ lang[locale]['progression'] }}
                    <span class="box--ic-right">
               <i class="icon-help tooltip">
                   <span class="tooltip-text left"> {{ lang[locale]['tip-progression'] }} </span>
               </i>
               </span>
                </div>
                <div class="table-column text--xxxs text--medium popularity">{{ lang[locale]['popularity'] }}
                    <span class="box--ic-right">
               <span class="icon-sort popularity" @click="sortBy('popularity')"></span>
               <i class="icon-help tooltip">
                   <span class="tooltip-text left"> {{ lang[locale]['tip-popularity'] }} </span>
               </i>
               </span>
                </div>

                <div class="table-column text--xxxxs" v-if="isPopularitySub">{{ lang[locale]['linkedin'] }}</div>
                <div class="table-column text--xxxxs" v-if="isPopularitySub">{{ lang[locale]['wechat'] }}</div>
                <div class="table-column text--xxxxs" v-if="isPopularitySub">{{ lang[locale]['weibo'] }}</div>
                <div class="table-column text--xxxxs" v-if="isPopularitySub">{{ lang[locale]['kanzhun'] }}</div>

                <div class="table-column text--xxxs text--medium activity">{{ lang[locale]['activities'] }}
                    <span class="box--ic-right">
               <span class="icon-sort activity" @click="sortBy('activity')"></span>
               <i class="icon-help tooltip">
                   <span class="tooltip-text right"> {{ lang[locale]['tip-activity'] }} </span>
               </i>
               </span>
                </div>

                <div class="table-column text--xxxxs" v-if="isActivitySub">{{ lang[locale]['linkedin'] }}</div>
                <div class="table-column text--xxxxs" v-if="isActivitySub">{{ lang[locale]['wechat'] }}</div>
                <div class="table-column text--xxxxs" v-if="isActivitySub">{{ lang[locale]['weibo'] }}</div>
                <div class="table-column text--xxxxs" v-if="isActivitySub">{{ lang[locale]['kanzhun'] }}</div>


                <div class="table-column text--xxxs text--medium engagement">{{ lang[locale]['engagement'] }}
                    <span class="box--ic-right">
               <span class="icon-sort engagement" @click="sortBy('engagement')"></span>
               <i class="icon-help tooltip">
                   <span class="tooltip-text right"> {{ lang[locale]['tip-engagement'] }} </span>
               </i>
               </span>
                </div>
                <div class="table-column text--xxxxs" v-if="isEngageSub">{{ lang[locale]['linkedin'] }}</div>
                <div class="table-column text--xxxxs" v-if="isEngageSub">{{ lang[locale]['wechat'] }}</div>
                <div class="table-column text--xxxxs" v-if="isEngageSub">{{ lang[locale]['weibo'] }}</div>
                <div class="table-column text--xxxxs" v-if="isEngageSub">{{ lang[locale]['kanzhun'] }}</div>

            </div>
        </div>

        <div :class="['rank-table ',{'is-filter-open': isMobileFilter }]" id="rankTable"
             @scroll="scrollLoad($event)" :style="{'overflow-y': 'auto'}">

            <!--<div class="rank-table__inner"></div>-->
            <!--<div class="left-purple-col"></div>-->
            <div class="rank-table__inner">
                <div v-for="(item, index) in allList" :class="['table-row', {'mobile-channels-show': isMobChannelShow}]"
                     :id="'row-'+item.id">
                    <div class="table-column rank-column col-purple"> {{ index + 1 }}</div>
                    <div class="table-column double"><img :src="item.logo" alt="" class="company-logo"> <span
                        class="organization-name">{{ item.organization }} </span></div>
                    <div class="table-column">{{ item.composite }}</div>

                    <div
                        :class="['table-column', 'text--green', { 'negative' : isNegative(item.composite_shift), 'neutral' : isNuetral(item.composite_shift) }]">
                        <i class="icon-chevron-up text--strong"></i> <span
                        v-if="(!isNegative(item.composite_shift) && !isNuetral(item.composite_shift))">+</span>{{
                        item.composite_shift }} %
                    </div>

                    <!--NOTE:- popularity value if not filtered by channel-->
                    <div :class="['table-column' ,{'bg-grey' : isPopularitySub}, 'u-hidden-x u-hidden-s']"
                         v-if="!isChannelFilter"> {{ item.popularity.total }}
                        <span class="icon-expand" @click="showChannels('popularity')"
                              v-if="!isPopularitySub"></span>
                    </div>

                    <!--NOTE:- popularity value if filtered by channel-->
                    <div :class="['table-column' ,{'bg-grey' : isPopularitySub}, 'u-hidden-x u-hidden-s']"
                         v-if="isChannelFilter"> {{ item.popularity }}
                    </div>

                    <div class="table-column bg-grey text--xxxxs u-hidden-x u-hidden-s" v-if="isPopularitySub">{{
                        Math.ceil(item.popularity.channels[linkedInId]) }}
                    </div>
                    <div class="table-column bg-grey text--xxxxs u-hidden-x u-hidden-s" v-if="isPopularitySub">{{
                        Math.ceil(item.popularity.channels[wechatId]) }}
                    </div>
                    <div class="table-column bg-grey text--xxxxs u-hidden-x u-hidden-s" v-if="isPopularitySub">{{
                        Math.ceil(item.popularity.channels[weiboId]) }}
                    </div>
                    <div class="table-column bg-grey text--xxxxs u-hidden-x u-hidden-s" v-if="isPopularitySub">{{
                        Math.ceil(item.popularity.channels[kanzhunId]) }}<span class="icon-collapse"
                                                                               @click="closeChannels()"></span>
                    </div>

                    <!--NOTE:- Activity value if NOT filtered by channel-->
                    <div :class="['table-column' ,{'bg-grey' : isActivitySub},'u-hidden-x u-hidden-s']"
                         v-if="!isChannelFilter">{{ item.activity.total }}
                        <span class="icon-expand" @click="showChannels('activity')" v-if="!isActivitySub"></span>
                    </div>
                    <!--NOTE:- Activity value if filtered by channel-->
                    <div :class="['table-column' ,{'bg-grey' : isActivitySub},'u-hidden-x u-hidden-s']"
                         v-if="isChannelFilter">{{ item.activity }}
                    </div>


                    <div class="table-column bg-grey text--xxxxs u-hidden-x u-hidden-s" v-if="isActivitySub">{{
                        Math.ceil(item.activity.channels[linkedInId]) }}
                    </div>
                    <div class="table-column bg-grey text--xxxxs u-hidden-x u-hidden-s" v-if="isActivitySub">{{
                        Math.ceil(item.activity.channels[wechatId]) }}
                    </div>
                    <div class="table-column bg-grey text--xxxxs u-hidden-x u-hidden-s" v-if="isActivitySub">{{
                        Math.ceil(item.activity.channels[weiboId]) }}
                    </div>
                    <div class="table-column bg-grey text--xxxxs u-hidden-x u-hidden-s" v-if="isActivitySub">{{
                        Math.ceil(item.activity.channels[kanzhunId]) }}<span class="icon-collapse"
                                                                             @click="closeChannels()"></span></div>


                    <!--NOTE:- Engagement value if NOT filtered by channel-->
                    <div :class="['table-column' ,{'bg-grey' : isEngageSub}, 'u-hidden-x u-hidden-s']"
                         v-if="!isChannelFilter">{{ item.engagement.total }}
                        <span class="icon-expand last" @click="showChannels('engagement')"
                              v-if="!isEngageSub"></span>
                    </div>

                    <!--NOTE:- Engagement value if filtered by channel-->
                    <div :class="['table-column' ,{'bg-grey' : isEngageSub}, 'u-hidden-x u-hidden-s']"
                         v-if="isChannelFilter">{{ item.engagement }}
                    </div>


                    <div class="table-column bg-grey text--xxxxs u-hidden-x u-hidden-s" v-if="isEngageSub">{{
                        Math.ceil(item.engagement.channels[linkedInId]) }}
                    </div>
                    <div class="table-column bg-grey text--xxxxs u-hidden-x u-hidden-s" v-if="isEngageSub">{{
                        Math.ceil(item.engagement.channels[wechatId]) }}
                    </div>
                    <div class="table-column bg-grey text--xxxxs u-hidden-x u-hidden-s" v-if="isEngageSub">{{
                        Math.ceil(item.engagement.channels[weiboId]) }}
                    </div>
                    <div class="table-column bg-grey text--xxxxs u-hidden-x u-hidden-s" v-if="isEngageSub">{{
                        Math.ceil(item.engagement.channels[kanzhunId]) }}<span class="icon-collapse"
                                                                               @click="closeChannels()"></span>
                    </div>


                    <div class="table-column more-col" v-if="!isChannelFilter"><span class=""
                                                                                     @click="showMobChannelContainer('row-'+item.id)"> <img
                        src="@/assets/svg/more.svg" alt=""></span></div>

                    <span class="icon-share u-hidden-x u-hidden-s js-share-open" :data-name="item.organization"
                          @click="generateQRCode(item.organization)">
                   <img src="@/assets/svg/ic_share.svg" alt="">
               </span>


                    <div class="mobile-channels-container u-hidden-m u-hidden-l">

                        <div class="mob-channels-list">

                            <div class="mob-channel-item purple">
                                <div class="l-container-flex align-left">
                                    <div class="u-display-inline text--center" @click="showMobChannels('purple')">
                                        <span class="">Popularity</span>
                                        <div class="text--xxxs text--medium">{{ item.popularity.total }}</div>
                                    </div>
                                    <div class="u-display-inline u-pl-30 channel-details vertical-center">
                              <span class="u-display-inline u-pr-5" v-for="(channel , key) in item.popularity.channels">
                                  <i :class="[ {'icon-linkedin': key == 1 ,'icon-wechat' : key == 2,'icon-weibo' : key == 3, 'icon-kanzhan' : key == 4 }, 'channel-icon']"></i>
                                  <span class="text--xxxxs u-pr-5 channel-text"> {{ Math.ceil(channel) }}</span>
                              </span>
                                    </div>

                                </div>

                                <span class="icon-chevron-right-b u-p-15" @click="showMobChannels('purple')"></span>

                                <span class="icon-share u-hidden-m u-hidden-l js-share-open"
                                      :data-name="item.organization" @click="generateQRCode(item.organization)">
                               <img src="@/assets/svg/ic_share.svg" alt="">
                           </span>
                            </div>

                            <div class="mob-channel-item purple-medium">

                                <div class="l-container-flex align-left">
                                    <div class="u-display-inline text--center"
                                         @click="showMobChannels('purple-medium')">
                                        <span class="">Activity</span>
                                        <div class="text--xxxs text--medium">{{ item.activity.total }}</div>
                                    </div>
                                    <div class="u-display-inline u-pl-30 channel-details vertical-center">
                                   <span class="u-display-inline u-pr-5"
                                         v-for="(channel , key) in item.activity.channels">
                                    <i :class="[ {'icon-linkedin': key == 1 ,'icon-wechat' : key == 2,'icon-weibo' : key == 3, 'icon-kanzhan' : key == 4 }, 'channel-icon']"></i>
                                       <span class="text--xxxxs u-pr-5 channel-text"> {{ Math.ceil(channel) }}</span>
                                   </span>
                                    </div>

                                </div>


                                <span class="icon-chevron-right-b u-p-15"
                                      @click="showMobChannels('purple-medium')"></span>

                                <span class="icon-share u-hidden-m u-hidden-l js-share-open"
                                      :data-name="item.organization" @click="generateQRCode(item.organization)">
                               <img src="@/assets/svg/ic_share.svg" alt="">
                           </span>
                            </div>
                            <div class="mob-channel-item purple-light">

                                <div class="l-container-flex align-left">
                                    <div class="u-display-inline text--center"
                                         @click="showMobChannels('purple-light')">
                                        <span class="">Engagement</span>
                                        <div class="text--xxxs text--medium">{{ item.engagement.total }}</div>
                                    </div>
                                    <div class="u-display-inline u-pl-30 channel-details vertical-center">
                                   <span class="u-display-inline u-pr-5"
                                         v-for="(channel , key) in item.engagement.channels">
                                    <i :class="[ {'icon-linkedin': key == 1 ,'icon-wechat' : key == 2,'icon-weibo' : key == 3, 'icon-kanzhan' : key == 4 }, 'channel-icon']"></i>
                                       <span class="text--xxxxs u-pr-5 channel-text"> {{ Math.ceil(channel) }}</span>
                                   </span>
                                    </div>

                                </div>

                                <span class="icon-chevron-right-b u-p-15"
                                      @click="showMobChannels('purple-light')"></span>
                                <span class="icon-share u-hidden-m u-hidden-l js-share-open"
                                      :data-name="item.organization" @click="generateQRCode(item.organization)">
                               <img src="@/assets/svg/ic_share.svg" alt="">
                           </span>
                            </div>


                        </div>

                    </div>


                </div>
                <div class="table-row" id="bottomLoader" v-if="isNextPage">
                    <div class="table-column rank-column col-purple"></div>
                    <div class="table-column double loading-section text--center">
                        <img src="@/assets/svg/loading.svg" alt="">
                    </div>
                </div>
            </div>

            <!--no result message-->
            <div v-if="!hasResult">
                <div class="u-bg-white u-full-width text--center u-p-15 u-mt-60">
                    {{ lang[locale]['no-organization-found-1']}}<a href="#contact-form"
                                                                   class="js-nav-item btn-link--red_purple u-plr-5"
                                                                   data-id="contact-form">{{
                    lang[locale]['no-organization-found-cta'] }}</a>{{ lang[locale]['no-organization-found-2']}}
                </div>
            </div>
            <!--no result message-->

            <div class="u-mtb-30 text--center" v-if="isFromHash">
                <span class="btn-link--purple text--xxs text--medium u-ptb-15" @click="resetAllFilter">{{ lang[locale]['show-all']}}</span>
            </div>


        </div>


        <div class="u-p-15 u-hidden-m u-hidden-l">

            <div class="text--xxxxs text--grey text--center"> {{ lang[locale]['no-org-text']}}</div>

            <div class="btn-wrap u-mtb-15 u-float-right u-ml-15 u-full-width">
                <a href="#" class="btn btn-red js-nav-item" data-id="contact-form">
                    <span class="btn-over btn-over-red"></span>
                    <span class="btn-text">{{lang[locale]['no-org-cta']}}</span>
                </a>
            </div>

        </div>


    </div>

</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import axios from 'axios'
import debounce from 'lodash.debounce'
import langData from '@/assets/lang/messages.json'
import { useI18n } from 'vue-i18n'

const lang = JSON.parse(JSON.stringify(langData))

// 状态定义
const isLoading = ref(false)
const allList = ref([])
const page = ref(1)
const pageUrl = ref('')
const isNextPage = ref(true)
const total = ref(0)
const linkedInId = ref('1')
const wechatId = ref('2')
const weiboId = ref('3')
const kanzhunId = ref('4')
const isPopularitySub = ref(false)
const isActivitySub = ref(false)
const isEngageSub = ref(false)
const bottomLoaderId = ref("bottomLoader")
const filters = reactive({
  channels: [],
  industries: [],
  periods: []
})
const searchQuery = ref('')
const filterIndustryId = ref('')
const filterChannelId = ref('')
const filterPeriodId = ref('')
const filterPeriodName = ref('')
const isSearchFilter = ref(false)
const orderBy = ref('composite')
const orderByDirection = ref('desc')
const isSortedColChanged = ref(false)
const isMobileFilter = ref(false)
const isMobChannelShow = ref(false)
const isChannelFilter = ref(false)
const lastPeriod = ref('')
const isShowRank = ref(true)
const isFromHash = ref(false)
const locale = ref('zh')
const hasResult = ref(true)

// 方法定义
const getRankList = async () => {
  hasResult.value = true
  isLoading.value = true
  
  try {
    const res = await axios.post(pageUrl.value, {
      page: page.value,
      organization: searchQuery.value,
      period_id: filterPeriodId.value,
      industry_id: filterIndustryId.value,
      channel_id: filterChannelId.value,
      order_by: orderBy.value,
      order_by_direction: orderByDirection.value,
    })
    
    allList.value = allList.value.length > 0 ? 
      [...allList.value, ...res.data.data] : 
      res.data.data
      
    page.value++
    isNextPage.value = res.data.meta.current_page !== res.data.meta.last_page
    hasResult.value = allList.value.length > 0
    
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

const resetAllFilter = () => {
  isNextPage.value = true
  allList.value = []
  page.value = 1
  searchQuery.value = ''
  filterPeriodId.value = lastPeriod.value
  filterChannelId.value = ''
  filterIndustryId.value = ''
  orderBy.value = 'composite'
  orderByDirection.value = 'desc'
  isChannelFilter.value = false
  isShowRank.value = true
  isFromHash.value = false

  // DOM操作建议使用refs重构
  document.getElementById('industry').options.selectedIndex = 0
  document.getElementById('channel').options.selectedIndex = 0
  document.getElementById('period').options.selectedIndex = 0
  document.getElementById('searchField').value = ""
  
  getRankList()
}

const search = debounce((event: Event) => {
  const target = event.target as HTMLInputElement
  page.value = 1
  
  if (target.value.length >= 2) {
    searchQuery.value = target.value
    isNextPage.value = true
    allList.value = []
    isShowRank.value = false
    getRankList()
  } else if (target.value.length === 0) {
    searchQuery.value = ""
    isNextPage.value = true
    allList.value = []
    getRankList()
  }
}, 600)

const filterChanged = (event: Event) => {
  const target = event.target as HTMLSelectElement
  
  if (target.name === "industry") {
    filterIndustryId.value = target.value
  }
  
  if (target.name === "channel") {
    filterChannelId.value = target.value
    isChannelFilter.value = target.value.length > 0
  }
  
  if (target.name === "period") {
    filterPeriodId.value = target.value
  }
  
  isNextPage.value = true
  allList.value = []
  page.value = 1
  isShowRank.value = false
  
  getRankList()
}

const sortBy = (val: string) => {
  $('.icon-sort').removeClass('asc')
  $('.icon-sort').removeClass('desc')
  $('.table-column').removeClass('text--purple')

  if (orderBy.value != val) {
    isSortedColChanged.value = true
  } else {
    isSortedColChanged.value = false
  }

  if (val == "composite") {
    orderBy.value = 'composite'
  } else if (val == "popularity") {
    orderBy.value = 'popularity'
  } else if (val == "activity") {
    orderBy.value = 'activity'
  } else if (val == "engagement") {
    orderBy.value = 'engagement'
  }

  if (orderByDirection.value === 'desc') {
    if (isSortedColChanged.value) {
      orderByDirection.value = 'desc'
    } else {
      orderByDirection.value = 'asc'
    }
    $('.icon-sort.' + orderBy.value).addClass(orderByDirection.value)
    $('.table-column.' + orderBy.value).addClass('text--purple')
  } else {
    orderByDirection.value = 'desc'
    $('.icon-sort.' + orderBy.value).addClass('desc')
    $('.table-column.' + orderBy.value).addClass('text--purple')
  }

  allList.value = []
  page.value = 1
  isNextPage.value = true
  isShowRank.value = false

  getRankList()
}

const toggleMobileFilter = () => {
  isMobileFilter.value = !isMobileFilter.value
}

const showChannels = (val: string) => {
  if (!isChannelFilter.value) {
    if (val === 'popularity') {
      isPopularitySub.value = true
      isActivitySub.value = false
      isEngageSub.value = false
    }
    if (val === 'engagement') {
      isPopularitySub.value = false
      isActivitySub.value = false
      isEngageSub.value = true
    }
    if (val === 'activity') {
      isPopularitySub.value = false
      isActivitySub.value = true
      isEngageSub.value = false
    }
  }
}

const closeChannels = () => {
  isPopularitySub.value = false
  isActivitySub.value = false
  isEngageSub.value = false
}

const isNegative = (value: number) => {
  return value < 0
}

const isNuetral = (value: number) => {
  return value == 0
}

const getWeekTranslate = (value: string) => {
  if (value.length > 0) {
    return value.replace("Week", lang[locale.value]['week'])
  }
}

const showMobChannelContainer = (id: string) => {
  const row = document.getElementById(id)
  if (row?.classList.contains('open')) {
    row.classList.remove('open')
  } else {
    document.querySelectorAll('.table-row').forEach(r => r.classList.remove('open'))
    document.querySelectorAll('.mob-channel-item').forEach(r => r.classList.remove('open'))
    row?.classList.add('open')
  }
}

const showMobChannels = (className: string) => {
  const items = document.querySelectorAll('.mob-channel-item.' + className)
  if (items[0]?.classList.contains('open')) {
    items.forEach(i => i.classList.remove('open'))
  } else {
    document.querySelectorAll('.mob-channel-item').forEach(i => i.classList.remove('open'))
    items.forEach(i => i.classList.add('open'))
  }
}

const generateQRCode = (companyName: string) => {
  const canvas = document.getElementById('qrcode') as HTMLCanvasElement
  const lang = locale.value == 'zh' ? '/zh' : ''

  const link = window.location.origin + lang + '/#organization=' + companyName

  QRCode.toCanvas(canvas, link, function (error) {
    if (error) console.error(error)
    $shareLightbox.open()
  })

  document.querySelectorAll('.js-linkedin-share').forEach(i => i.setAttribute('data-url', link))
  document.querySelectorAll('.js-weibo-share').forEach(i => i.setAttribute('data-url', link))
}

const scrollLoad = (event: Event) => {
  const target = event.target as HTMLElement
  if (isNextPage.value) {
    const bottomLoader = document.getElementById('bottomLoader')
    if (bottomLoader && bottomLoader.offsetTop <= (target.scrollTop + target.offsetHeight)) {
      if (isNextPage.value && !isLoading.value) {
        getRankList()
      }
    }
  }
}

// 生命周期钩子
onMounted(() => {
  const hashStr = window.location.hash.substr(1)
  let searchQuery = ''

  if (hashStr.split('=')[0] === 'organization') {
    searchQuery = decodeURIComponent(hashStr.split('=')[1])
  }

  const container = document.getElementById('js-main-table')
  if (container) {
    pageUrl.value = container.getAttribute('data-url') || ''
    filters.channels = JSON.parse(container.getAttribute('data-channels') || '[]')
    filters.industries = JSON.parse(container.getAttribute('data-industries') || '[]')
    filters.periods = JSON.parse(container.getAttribute('data-periods') || '[]')
    locale.value = 'zh'
  }

  if (filters.periods.length > 0) {
    lastPeriod.value = filters.periods[0]['id']
    filterPeriodId.value = lastPeriod.value
  }

  if (searchQuery) {
    searchQuery.value = searchQuery
    isFromHash.value = true
    // scrollToTable()
  }

  getRankList()
})

// 导出需要在模板中使用的属性和方法
defineExpose({
  isLoading,
  allList,
  filters,
  lang,
  locale,
  hasResult,
  search,
  filterChanged,
  resetAllFilter
})
</script>
