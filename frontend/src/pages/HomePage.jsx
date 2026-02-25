import AddTask from "@/components/AddTask";
import DateTimeFilter from "@/components/DateTimeFilter";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import StatsAndFilters from "@/components/StatsAndFilters";
import TaskList from "@/components/TaskList";
import TaskListPagination from "@/components/TaskListPagination";
import React from "react";

const HomePage = () => {
    return (
        <div className="min-h-screen w-full bg-white relative">
  {/* Purple Gradient Grid Left Background */}
  <div
    className="absolute inset-0 z-0"
    style={{
      backgroundImage: `
        linear-gradient(to right, #f0f0f0 1px, transparent 1px),
        linear-gradient(to bottom, #f0f0f0 1px, transparent 1px),
        radial-gradient(circle 800px at 0% 200px, #d5c5ff, transparent)
      `,
      backgroundSize: "96px 64px, 96px 64px, 100% 100%",
    }}
  />
     {/* Your Content/Components */}
     <div className="container pt-8 mx-auto relative z-10">
                    <div className="w-full max-w-2xl p-6 mx-auto space-y-6">

                        <Header />

                        <AddTask />

                        <StatsAndFilters />

                        <TaskList />

                        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
                            <TaskListPagination />
                            <DateTimeFilter />
                        </div>

                        <Footer />

                    </div>
        </div>
</div>
        
    )
}

export default HomePage