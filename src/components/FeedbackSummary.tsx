"use client";
import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const FeedbackSummary = () => {
  const [feedbackData, setFeedbackData] = useState<any[]>([]);
  const [ratingStats, setRatingStats] = useState<any[]>([]);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await fetch("/api/feedback/summary");
        const data = await res.json();
        setFeedbackData(data.feedbackData || []);
        setRatingStats(data.ratingStats || []);
      } catch (err) {
        console.error("Error fetching feedback summary:", err);
      }
    };
    fetchSummary();
  }, []);

  return (
    <div className="space-y-8 p-6">
      <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight">
        📊 Feedback Summary
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pie Chart */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-700">
              Feedback Distribution
            </h3>
          </div>
          <div className="p-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={feedbackData}
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {feedbackData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-700">
              Rating Breakdown
            </h3>
          </div>
          <div className="p-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ratingStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="rating" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#6366f1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {ratingStats?.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow-md border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.rating} Ratings</p>
                <p className="text-3xl font-bold text-gray-800">{stat.count}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Percentage</p>
                <p className="text-xl font-semibold text-indigo-600">
                  {stat.percentage}%
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackSummary;
