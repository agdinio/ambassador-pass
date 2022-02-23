import { observable, action, computed } from 'mobx'
import agent from '@/Agent'
import LiveGameStore from '@/stores/LiveGameStore'
import ProfileStore from '@/stores/ProfileStore'
import ResolveStore from '@/stores/ResolveStore'

class PrePickStore {
  @observable
  currentPrePick = 1
  @observable
  totalPrePicks = 0
  @observable
  totalPoints = 0
  @observable
  totalTokens = 0
  @observable
  teams = []
  @observable
  isTeamsLoading = false
  @observable
  questions = []
  @observable
  answers = []
  @observable
  preAnswers = []
  @observable
  messages = []
  @observable
  isLoading = false
  @observable
  multiplier = 0
  @action
  setMultiplier(val) {
    this.multiplier = val
  }

  @observable
  isStar = false
  @action
  setIsStar(val) {
    this.isStar = val
  }

  @action
  pullQuestions() {
    this.isLoading = true
    return agent.PrePick.pullQuestions()
      .then(
        action(({ data }) => {
          debugger
          this.questions = data.questions
        })
      )
      .finally(
        action(() => {
          this.isLoading = false
        })
      )
  }
  @action
  pullData_OLD() {
    this.isLoading = true
    return agent.PrePick.pullData()
      .then(
        action(({ data }) => {
          this.teams = data.teams
          this.questions = data.questions
          this.messages = data.messages
          this.totalPrePicks = data.questions.length
        })
      )
      .finally(
        action(() => {
          this.isLoading = false
        })
      )
  }

  @action
  pullData() {
    debugger
    this.isLoading = true
    return agent.PrePick.pullTeams()
      .then(data => {
        debugger
        this.teams = data.teams
        return agent.PrePick.pullQuestionsPrePick()
      })
      .then(data => {
        debugger
        this.questions = data.questions
        this.totalPrePicks = data.questions.length
        ResolveStore.setTotalPrePick(data.questions.length)

        if (this.answers.length > 0) {
          this.questions.forEach(x => {
            debugger
            let ans = this.answers.filter(o => o.questionId === x.id)[0]
            if (ans) {
              this.preAnswers.push(ans)
            }
          })
        } else {
          agent.PrePick.pullPreAnswers().then(data => {
            debugger
            this.preAnswers = data.answers
          })
        }

        return agent.PrePick.pullMessages()
      })
      .then(data => {
        debugger
        this.messages = data.messages
        return true
      })
      .finally(
        action(() => {
          this.isLoading = false
        })
      )
  }

  @action
  pullTeams(callback) {
    this.isLoading = true
    return agent.PrePick.pullTeams()
      .then(
        action(data => {
          this.teams = data.teams
        })
      )
      .finally(
        action(() => {
          this.isLoading = false
          if (callback) {
            callback(true)
          }
        })
      )
  }

  @computed
  get prePickAnswers() {
    return this.answers.filter(o => 'PREPICK' === o.type.toUpperCase())
  }

  @computed
  get correctLivePlayAnswers() {
    debugger
    let arr = []
    let ans = this.answers.filter(o => 'LIVEPLAY' === o.type.toUpperCase())
    for (let i = 0; i < ans.length; i++) {
      let subans = ans[i]
      for (let j = 0; j < subans.livegameAnswers.length; j++) {
        let liveplayAns = subans.livegameAnswers[j]
        if (liveplayAns.answer === liveplayAns.correctAnswer) {
          arr.push(liveplayAns)
        }
      }
    }

    return arr
  }

  @computed
  get correctGameMasterAnswers() {
    let arr = []
    let ans = this.answers.filter(o => 'GAMEMASTER' === o.type.toUpperCase())
    for (let i = 0; i < ans.length; i++) {
      let subans = ans[i]
      for (let j = 0; j < subans.livegameAnswers.length; j++) {
        let liveplayAns = subans.livegameAnswers[j]
        if (liveplayAns.answer === liveplayAns.correctAnswer) {
          arr.push(liveplayAns)
        }
      }
    }

    return arr
  }

  @computed
  get correctSponsorAnswers() {
    let arr = []
    let ans = this.answers.filter(o => 'SPONSOR' === o.type.toUpperCase())
    for (let i = 0; i < ans.length; i++) {
      let subans = ans[i]
      for (let j = 0; j < subans.livegameAnswers.length; j++) {
        let liveplayAns = subans.livegameAnswers[j]
        if (liveplayAns.answer === liveplayAns.correctAnswer) {
          arr.push(liveplayAns)
        }
      }
    }

    return arr
  }

  @computed
  get correctPrizeAnswers() {
    let arr = []
    let ans = this.answers.filter(o => 'PRIZE' === o.type.toUpperCase())
    for (let i = 0; i < ans.length; i++) {
      let subans = ans[i]
      for (let j = 0; j < subans.livegameAnswers.length; j++) {
        let liveplayAns = subans.livegameAnswers[j]
        if (liveplayAns.answer === liveplayAns.correctAnswer) {
          arr.push(liveplayAns)
        }
      }
    }

    return arr
  }

  @computed
  get gameMasterAnswers() {
    return this.answers.filter(o => 'GAMEMASTER' === o.type.toUpperCase())
  }

  @computed
  get sponsorAnswers() {
    return this.answers.filter(o => 'SPONSOR' === o.type.toUpperCase())
  }

  @action
  pullPreAnswers_() {
    this.isLoading = true

    /*
    return new Promise((resolve, reject) => {

      let answers = []
      this.questions.forEach(x => {
        debugger
        let ans = this.answers.filter(o => o.questionId === x.id)[0]
        if (ans) {
          answers.push(ans)
        }
      })

      resolve(answers)
    })
      .finally(() => {
        this.isLoading = false
      })
*/
  }

  @action
  pushAnswer(response) {
    debugger
    if (response.type === 'PrePick') {
      this.answers.push({
        type: response.type,
        multiplier: 0,
        questionId: response.questionId,
        prepickSequence: response.prepickSequence,
        shortHand: response.shortHand,
        answer: response.answer,
        correctAnswer: response.correctAnswer,
      })
    } else {
      debugger
      if (response.choicesLength && response.choicesLength > 1) {
        this.captureAnalyticLivePlayAnswered()
        if (response.stars && response.stars > 0) {
          this.captureAnalyticStarsAnswered()
        }
        this.multiplier += 1

        if (this.multiplier === 1) {
          LiveGameStore.setCurrentMainQuestion(response.questionId)

          if (response.type !== 'ExtraPoint') {
            if (response.feeCounterValue) {
              ProfileStore.debitCurrencies({
                currency: 'tokens',
                amount: response.feeCounterValue,
              })
            }
          }
        }

        LiveGameStore.livegameAnswers.push({
          id: response.questionId,
          answer: response.answer,
          multiplier: this.multiplier,
          correctAnswer: response.correctAnswer,
          isCredited: false,
          stars: response.stars,
          shortHand: response.shortHand,
        })

        const cur = LiveGameStore.currentScriptItem
        if (cur && response.nextId <= 0) {
          if (!this.isAnswerExists(response.questionId)) {
            let sHand = ''
            if (response.type === 'Prize') {
              sHand = response.shortHand
            } else if (response.type === 'ExtraPoint') {
              if (response.answer === response.correctAnswer) {
                //RE sHand = '+' + response.points
                sHand = 'GOOD'
              }
            } else {
              sHand = this.multiplier * (LiveGameStore.feeCounterValue * 100)
            }

            this.answers.push({
              type: response.type,
              multiplier: this.multiplier,
              questionId:
                LiveGameStore.currentMainQuestion.id || response.questionId,
              prepickSequence: response.prepickSequence,
              shortHand: response.stars > 0 ? response.shortHand : sHand,
              answer: response.type === 'LivePlay' ? '' : response.answer,
              correctAnswer: response.correctAnswer,
              feeCounterValue: LiveGameStore.feeCounterValue,
              livegameAnswers: LiveGameStore.livegameAnswers,
              extraPoints: response.points,
              stars: response.stars,
            })

            const timeout = setTimeout(() => {
              LiveGameStore.livegameAnswers = []
              clearTimeout(timeout)
            }, 1000)
          }
        } else {
          /**
           * If runningLength is equal to zero but answer is valid
           */
          debugger
          if (LiveGameStore.runningLength <= 1) {
            if (!this.isAnswerExists(response.questionId)) {
              let sHand = ''
              if (response.type === 'Prize') {
                sHand = response.shortHand
              } else if (response.type === 'ExtraPoint') {
                if (response.answer === response.correctAnswer) {
                  //RE sHand = '+' + response.points
                  sHand = 'GOOD'
                }
              } else {
                sHand = this.multiplier * (LiveGameStore.feeCounterValue * 100)
              }

              this.answers.push({
                type: response.type,
                multiplier: this.multiplier,
                questionId:
                  LiveGameStore.currentMainQuestion.id || response.questionId,
                prepickSequence: response.prepickSequence,
                shortHand: response.stars > 0 ? response.shortHand : sHand,
                answer: response.type === 'LivePlay' ? '' : response.answer,
                correctAnswer: response.correctAnswer,
                feeCounterValue: LiveGameStore.feeCounterValue,
                livegameAnswers: LiveGameStore.livegameAnswers,
                extraPoints: response.points,
                stars: response.stars,
              })

              const timeout = setTimeout(() => {
                LiveGameStore.livegameAnswers = []
                clearTimeout(timeout)
              }, 1000)
            }
          }
        }
      }
    }
  }

  @action
  isAnswerExists(id) {
    return this.answers.filter(o => o.questionId === id)[0]
  }

  @action
  pushAnswerOnLivePlay(response) {
    debugger
    if (!this.isAnswerExists(response.id)) {
      if (response.id !== LiveGameStore.currentMainQuestion.id) {
        LiveGameStore.setCurrentMainQuestion(response.id)
      }

      this.captureAnalyticLivePlayUnAnswered()
      if (response.stars && response.stars > 0) {
        this.captureAnalyticStarsUnAnswered()
      }

      this.answers.push({
        isTimeout: true,
        type: response.type,
        multiplier: this.multiplier,
        questionId: LiveGameStore.currentMainQuestion.id || response.id,
        prepickSequence: response.sequence,
        shortHand:
          response.stars > 0
            ? response.shortHand
            : this.multiplier * (LiveGameStore.feeCounterValue * 100),
        answer: response.answer,
        feeCounterValue: LiveGameStore.feeCounterValue,
        livegameAnswers:
          LiveGameStore.livegameAnswers.length > 0
            ? LiveGameStore.livegameAnswers
            : [],
        isStar: response.isStar,
      })

      const timeout = setTimeout(() => {
        //--au this.multiplier = 0
        LiveGameStore.livegameAnswers = []
        clearTimeout(timeout)
      }, 1000)
    }
  }

  @action
  setTokensTemp(val) {
    this.totalTokens = val
  }

  @action
  setPointsTemp(val) {
    this.totalPoints = val
  }

  @action
  pushEmpty(response) {
    while (
      LiveGameStore.currentScriptItem &&
      LiveGameStore.currentScriptItem.isMultiplier
    ) {
      LiveGameStore.nextQuestion()
    }
    this.multiplier = 0
    this.answers.push({
      type: response.type,
      questionId: response.questionId,
      empty: true,
      prepickSequence: response.prepickSequence,
      shortHand: '',
      answer: '',
    })
  }

  @computed
  get getAnswers() {
    return this.answers
  }

  @action
  incrementCurrentPrePick(val) {
    this.currentPrePick += val
  }

  @action
  resetCurrentPrePick() {
    this.currentPrePick = 1
  }

  @observable
  prePickPlaythrough = 0
  @action
  setPrePickPlaythrough(val) {
    this.prePickPlaythrough = val
  }

  @action
  resetVars() {
    this.currentPrePick = 1
    this.totalPrePicks = 0
    this.totalPoints = 0
    this.totalTokens = 0
    this.isTeamsLoading = false
    this.questions = []
    this.answers = []
    this.preAnswers = []
    this.messages = []
    this.isLoading = false
    this.multiplier = 0
    this.prePickPlaythrough = 0
  }

  /******************************************* ANALYTIC PREPICK *******************************************************/
  captureAnalyticPrePickStart() {
    /**
     *
     * ANALYTICS KEY: [player.prepick.answer.#]
     *
     */
    agent.Server.analyticsStartTimer(
      'player.prepick.answer.' + this.currentPrePick + '.time'
    )
  }

  captureAnalyticPrePickAnswered(answer) {
    /**
     *
     * ANALYTICS KEY: [player.prepick.answer.#]
     *
     */
    agent.Server.analyticsStopTimer(
      'player.prepick.answer.' + this.currentPrePick + '.time'
    )
    agent.Server.analyticsCount('player.prepick.answer.' + this.currentPrePick)
    agent.Server.analyticsRecordAnswer(
      'player.prepick.answer.' + this.currentPrePick + '.info',
      answer
    )
  }

  /******************************************* ANALYTIC LIVEPLAY *******************************************************/
  captureAnalyticLivePlayStart() {
    /**
     *
     * ANALYTICS KEY: [player.live.answer.#]
     *
     */
    agent.Server.analyticsStartTimer(
      'player.live.answer.' + LiveGameStore.currentLivePlayCount + '.time'
    )
  }

  captureAnalyticLivePlayAnswered(answer) {
    /**
     *
     * ANALYTICS KEY: [player.live.answer.#]
     *
     */
    agent.Server.analyticsStopTimer(
      'player.live.answer.' + LiveGameStore.currentLivePlayCount + '.time'
    )
    agent.Server.analyticsCount(
      'player.live.answer.' + LiveGameStore.currentLivePlayCount
    )
    agent.Server.analyticsRecordAnswer(
      'player.live.answer.' + LiveGameStore.currentLivePlayCount + '.info',
      answer
    )
  }

  captureAnalyticLivePlayUnAnswered() {
    /**
     *
     * ANALYTICS KEY: [player.live.answer.#]
     *
     */
    agent.Server.analyticsStopTimer(
      'player.live.answer.' + LiveGameStore.currentLivePlayCount + '.time'
    )
  }

  /******************************************* ANALYTIC STARS **********************************************************/
  captureAnalyticStarsStart() {
    /**
     *
     * ANALYTICS KEY: [player.stars.answer.#]
     *
     */
    agent.Server.analyticsStartTimer(
      'player.stars.answer.' + LiveGameStore.currentStarCount + '.time'
    )
  }

  captureAnalyticStarsAnswered(answer) {
    /**
     *
     * ANALYTICS KEY: [player.stars.answer.#]
     *
     */
    agent.Server.analyticsStopTimer(
      'player.stars.answer.' + LiveGameStore.currentStarCount + '.time'
    )
    agent.Server.analyticsCount(
      'player.stars.answer.' + LiveGameStore.currentStarCount
    )
    agent.Server.analyticsRecordAnswer(
      'player.stars.answer.' + LiveGameStore.currentStarCount + '.info',
      answer
    )
  }

  captureAnalyticStarsUnAnswered() {
    /**
     *
     * ANALYTICS KEY: [player.stars.answer.#]
     *
     */
    agent.Server.analyticsStopTimer(
      'player.stars.answer.' + LiveGameStore.currentStarCount + '.time'
    )
  }
}

export default new PrePickStore()
