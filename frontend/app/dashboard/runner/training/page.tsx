"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Calendar, Clock, Target, TrendingUp, Play, Pause, RotateCcw, Plus } from "lucide-react"

export default function RunnerTrainingPage() {
  const [activeTimer, setActiveTimer] = useState<string | null>(null)
  const [timerSeconds, setTimerSeconds] = useState(0)

  const workouts = [
    {
      id: 1,
      name: "Speed Intervals",
      type: "Speed Work",
      duration: "45 min",
      distance: "5.2 km",
      status: "completed",
      date: "2024-01-10",
      splits: ["1:45", "1:42", "1:48", "1:44"],
      notes: "Felt strong on the third interval",
    },
    {
      id: 2,
      name: "Long Run",
      type: "Endurance",
      duration: "90 min",
      distance: "15.8 km",
      status: "completed",
      date: "2024-01-08",
      pace: "5:42/km",
      notes: "Maintained steady pace throughout",
    },
    {
      id: 3,
      name: "Recovery Run",
      type: "Recovery",
      duration: "30 min",
      distance: "4.5 km",
      status: "scheduled",
      date: "2024-01-12",
      plannedPace: "6:30/km",
    },
  ]

  const trainingPlan = {
    currentWeek: 3,
    totalWeeks: 12,
    weeklyGoal: "Build aerobic base",
    completedWorkouts: 4,
    plannedWorkouts: 6,
  }

  const personalBests = [
    { distance: "400m", time: "58.2s", date: "2024-01-05" },
    { distance: "800m", time: "2:15.8", date: "2023-12-20" },
    { distance: "1500m", time: "4:42.1", date: "2023-12-15" },
    { distance: "5K", time: "18:35", date: "2023-11-28" },
  ]

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="heading-font text-3xl font-bold text-[#EAEAE8]">Training Center</h1>
          <p className="text-[#868684] mt-2">Track your progress and optimize your performance</p>
        </div>
        <Button className="bg-[#EAEAE8] text-black px-6 py-3 font-bold hover:bg-white transition-all duration-300 hover:scale-105">
          <Plus className="w-4 h-4 mr-2" />
          Log Workout
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-[#868684]/10 border border-[#868684]/20">
          <TabsTrigger value="overview" className="data-[state=active]:bg-[#EAEAE8] data-[state=active]:text-black">
            Overview
          </TabsTrigger>
          <TabsTrigger value="workouts" className="data-[state=active]:bg-[#EAEAE8] data-[state=active]:text-black">
            Workouts
          </TabsTrigger>
          <TabsTrigger value="timer" className="data-[state=active]:bg-[#EAEAE8] data-[state=active]:text-black">
            Timer
          </TabsTrigger>
          <TabsTrigger value="progress" className="data-[state=active]:bg-[#EAEAE8] data-[state=active]:text-black">
            Progress
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#868684]/5 border border-[#868684]/20 p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <Target className="w-8 h-8 text-cyan-400" />
              </div>
              <div className="heading-font text-2xl font-bold text-white mb-1">4/6</div>
              <div className="text-[#868684] text-sm mb-2">Workouts completed</div>
              <Progress value={67} className="mt-2" />
            </div>

            <div className="bg-[#868684]/5 border border-[#868684]/20 p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <TrendingUp className="w-8 h-8 text-purple-400" />
              </div>
              <div className="heading-font text-2xl font-bold text-white mb-1">42.8 km</div>
              <div className="text-[#868684] text-sm">Total Distance This Week</div>
            </div>

            <div className="bg-[#868684]/5 border border-[#868684]/20 p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <Clock className="w-8 h-8 text-green-400" />
              </div>
              <div className="heading-font text-2xl font-bold text-white mb-1">285</div>
              <div className="text-[#868684] text-sm">Training Load (TSS)</div>
            </div>

            <div className="bg-[#868684]/5 border border-[#868684]/20 p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <Target className="w-8 h-8 text-yellow-400" />
              </div>
              <div className="heading-font text-2xl font-bold text-white mb-1">78</div>
              <div className="text-[#868684] text-sm">Fitness Score</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-[#868684]/5 border border-[#868684]/20 p-6 rounded-lg">
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-5 h-5 text-cyan-400" />
                <h3 className="heading-font text-xl font-bold text-[#EAEAE8]">Training Plan Progress</h3>
              </div>
              <p className="text-[#868684] mb-4">
                Week {trainingPlan.currentWeek} of {trainingPlan.totalWeeks}
              </p>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-[#868684]">Overall Progress</span>
                    <span className="text-white">
                      {Math.round((trainingPlan.currentWeek / trainingPlan.totalWeeks) * 100)}%
                    </span>
                  </div>
                  <Progress value={(trainingPlan.currentWeek / trainingPlan.totalWeeks) * 100} />
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-white">Current Focus: {trainingPlan.weeklyGoal}</p>
                  <p className="text-sm text-[#868684]">
                    Workouts: {trainingPlan.completedWorkouts}/{trainingPlan.plannedWorkouts} completed
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#868684]/5 border border-[#868684]/20 p-6 rounded-lg">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-purple-400" />
                <h3 className="heading-font text-xl font-bold text-[#EAEAE8]">Personal Bests</h3>
              </div>
              <div className="space-y-3">
                {personalBests.map((pb, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <span className="font-medium text-white">{pb.distance}</span>
                      <span className="text-sm text-[#868684] ml-2">{pb.date}</span>
                    </div>
                    <Badge variant="outline" className="text-cyan-400 border-cyan-400">
                      {pb.time}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="workouts" className="space-y-6">
          <div className="space-y-4">
            {workouts.map((workout) => (
              <div key={workout.id} className="bg-[#868684]/5 border border-[#868684]/20 p-6 rounded-lg">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="heading-font text-lg font-bold text-[#EAEAE8]">{workout.name}</h3>
                    <div className="flex items-center gap-4 mt-1 text-[#868684]">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {workout.date}
                      </span>
                      <Badge variant={workout.status === "completed" ? "default" : "secondary"}>{workout.status}</Badge>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-[#EAEAE8] border-[#EAEAE8]">
                    {workout.type}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-[#868684]">Duration</p>
                    <p className="font-medium text-white">{workout.duration}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#868684]">Distance</p>
                    <p className="font-medium text-white">{workout.distance}</p>
                  </div>
                  {workout.pace && (
                    <div>
                      <p className="text-sm text-[#868684]">Avg Pace</p>
                      <p className="font-medium text-white">{workout.pace}</p>
                    </div>
                  )}
                  {workout.plannedPace && (
                    <div>
                      <p className="text-sm text-[#868684]">Planned Pace</p>
                      <p className="font-medium text-white">{workout.plannedPace}</p>
                    </div>
                  )}
                </div>

                {workout.splits && (
                  <div className="mb-4">
                    <p className="text-sm text-[#868684] mb-2">Splits</p>
                    <div className="flex gap-2">
                      {workout.splits.map((split, index) => (
                        <Badge key={index} variant="outline" className="text-[#EAEAE8] border-[#EAEAE8]">
                          {split}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {workout.notes && (
                  <div>
                    <p className="text-sm text-[#868684]">Notes</p>
                    <p className="text-sm text-white">{workout.notes}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="timer" className="space-y-6">
          <div className="bg-[#868684]/5 border border-[#868684]/20 p-6 rounded-lg">
            <h3 className="heading-font text-xl font-bold text-[#EAEAE8] text-center mb-6">Workout Timer</h3>
            <div className="text-center space-y-6">
              <div className="text-6xl font-mono font-bold text-cyan-400">{formatTime(timerSeconds)}</div>
              <div className="flex justify-center gap-4">
                <Button
                  size="lg"
                  onClick={() => setActiveTimer(activeTimer ? null : "running")}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {activeTimer ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => {
                    setTimerSeconds(0)
                    setActiveTimer(null)
                  }}
                  className="border-[#868684] text-[#EAEAE8] hover:bg-[#868684]/10"
                >
                  <RotateCcw className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#868684]/5 border border-[#868684]/20 p-6 rounded-lg">
              <h3 className="heading-font text-lg font-bold text-[#EAEAE8] mb-4">Quick Timers</h3>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent border-[#868684] text-[#EAEAE8] hover:bg-[#868684]/10"
                >
                  <Clock className="w-4 h-4 mr-2" />5 min warm-up
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent border-[#868684] text-[#EAEAE8] hover:bg-[#868684]/10"
                >
                  <Clock className="w-4 h-4 mr-2" />
                  400m interval (90s)
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent border-[#868684] text-[#EAEAE8] hover:bg-[#868684]/10"
                >
                  <Clock className="w-4 h-4 mr-2" />
                  Recovery (2 min)
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent border-[#868684] text-[#EAEAE8] hover:bg-[#868684]/10"
                >
                  <Clock className="w-4 h-4 mr-2" />
                  Cool down (10 min)
                </Button>
              </div>
            </div>

            <div className="bg-[#868684]/5 border border-[#868684]/20 p-6 rounded-lg">
              <h3 className="heading-font text-lg font-bold text-[#EAEAE8] mb-4">Interval Sets</h3>
              <div className="space-y-3">
                <div className="p-3 bg-[#868684]/10 border border-[#868684]/20 rounded-lg">
                  <p className="font-medium text-white">4 x 400m</p>
                  <p className="text-sm text-[#868684]">90s work / 2min rest</p>
                </div>
                <div className="p-3 bg-[#868684]/10 border border-[#868684]/20 rounded-lg">
                  <p className="font-medium text-white">8 x 200m</p>
                  <p className="text-sm text-[#868684]">45s work / 90s rest</p>
                </div>
                <div className="p-3 bg-[#868684]/10 border border-[#868684]/20 rounded-lg">
                  <p className="font-medium text-white">Tempo Run</p>
                  <p className="text-sm text-[#868684]">20min sustained effort</p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="progress" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-[#868684]/5 border border-[#868684]/20 p-6 rounded-lg">
              <h3 className="heading-font text-lg font-bold text-[#EAEAE8] mb-4">Performance Trends</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-[#868684]">5K Time</span>
                    <span className="text-sm font-medium text-green-400">-0:45 this month</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-[#868684]">Weekly Distance</span>
                    <span className="text-sm font-medium text-cyan-400">+8km this month</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-[#868684]">Training Consistency</span>
                    <span className="text-sm font-medium text-purple-400">85% this month</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
              </div>
            </div>

            <div className="bg-[#868684]/5 border border-[#868684]/20 p-6 rounded-lg">
              <h3 className="heading-font text-lg font-bold text-[#EAEAE8] mb-4">Monthly Summary</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-400">156</div>
                  <p className="text-sm text-[#868684]">Total km</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">18</div>
                  <p className="text-sm text-[#868684]">Workouts</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">12:45</div>
                  <p className="text-sm text-[#868684]">Total time</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">1,240</div>
                  <p className="text-sm text-[#868684]">Calories</p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
